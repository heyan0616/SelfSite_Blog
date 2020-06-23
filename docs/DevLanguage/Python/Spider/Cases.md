# Python 简单爬虫示例

一些简单的小示例供参考

## Case 1

爬取[http://www.ifensi.com/](http://www.ifensi.com/)中的明星关系数据，插入mysql数据库

``` python
import requests
from bs4 import BeautifulSoup
import pymysql


class StarRelationship:

    def __init__(self):
        pass

    # -----------------------------------------------------------------------------
    def getConnection(self):
        conn = pymysql.connect("localhost", "root", "root", "demo", port=3307, charset='utf8')
        cursor = conn.cursor()
        return conn, cursor

    def insertData(self, conn, cursor, fn, re, tn):
        query = ("insert into relationship(from_name, relation, to_name) values(%s, %s, %s)")
        cursor.execute(query, (fn, re, tn))
        conn.commit()
        print("one row be inserted - " + fn, re, tn)

    def closeConnection(self, conn, cursor):
        cursor.close()
        conn.close()

    # -----------------------------------------------------------------------------
    def getResponse(self, url_string):
        res = requests.get(url_string)
        return res

    # each page
    def page_process(self, url_string, conn, cursor):
        page_star_dict = {}

        response = self.getResponse(url_string)
        response.encoding = 'utf-8'

        soup = BeautifulSoup(response.text, 'lxml')
        result = soup.find_all('a', class_='si') + soup.find_all('a', class_='ti')

        for r in result:
            page_star_dict[str(r.span).replace('<http:></http:>', '')
                .replace('<span>', '').replace('</span>', '')] = str(r['href']) + "ziliao_gx/"

        # print (page_star_dict)
        for star, url in page_star_dict.items():
            person_page_response = self.getResponse(url)
            person_page_response.encoding = 'utf-8'

            person_page_soup = BeautifulSoup(person_page_response.text, 'lxml')

            person_page_result_list = person_page_soup.find_all('div', class_='gxj')

            for person_page_result in person_page_result_list:
                if (person_page_result.find('p') == None or person_page_result.find('a') == None):
                    pass
                else:
                    print(star, person_page_result.find('p').string, person_page_result.find('a').string)
                    # insert data
                    self.insertData(conn, cursor, star, person_page_result.find('p').string, person_page_result.find('a').string)

    # -----------------------------------------------------------------------------
    def spider(self, conn, cursor, url):

        # start
        main_url = url

        main_page_response = self.getResponse(main_url)
        main_page_soup = BeautifulSoup(main_page_response.text, 'lxml')
        last_page_num = int(main_page_soup.find_all('a', class_='three')[0].attrs['href']
                            .replace(main_url, '')
                            .replace('.html', '')
                            )
        for i in range(last_page_num):
        #for i in range(0, 100):
            loop_url = main_url + str(i + 1) + '.html'

            print("start process page: " + loop_url)
            self.page_process(loop_url, conn, cursor)


    def main(self):
        # get connection
        conn, cursor = self.getConnection()

        #
        base_url = 'http://www.ifensi.com/list9/1-1-1-1-1-1/'
        self.spider(conn, cursor, base_url)

        # close the connection
        self.closeConnection(conn, cursor)


# main function to start the process
sr = StarRelationship()
sr.main()
```



## Case 2

爬取飞猪网上的航班信息

``` python
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import pandas as pd
from datetime import datetime


def datelist(beginDate, endDate):
    # beginDate, endDate是形如‘20160601’的字符串或datetime格式
    date=[datetime.strftime(x,'%Y-%m-%d') for x in list(pd.date_range(start=beginDate, end=endDate))]
    return date


def spider_flight(depCity,arrCity,date):
    # -------------------------------------notes--------------------------------------
    # 介绍： Selenium+chromedriver 抓取JS动态网页
    # 提示： chromedriver.exe 放在项目目录下； 最新版本的Selenium已不再支持PhantomJS； 设置成headless模式，防止chrome弹出来
    # 系统需要 chrome >= 59
    # Windows 系统需要 chrome >= 60
    # Python3.6
    # Selenium==3.4.*
    # ChromeDriver==2.31
    # --------------------------------------------------------------------------------

    header = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 '
                          '(KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }

    flightlist_one = []

    # url = 'https://sjipiao.fliggy.com/flight_search_result.htm?tripType=0&depCity=HGH&arrCity=SIA&depDate=2018-05-24&searchBy=1280'
    url = 'https://sjipiao.fliggy.com/flight_search_result.htm?tripType=0&depCity='+depCity+'&arrCity='+arrCity+'&depDate='+date+'&searchBy=1280'

    # chrome headless settings - avoid chrome pop up
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.binary_location = r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'

    driver=webdriver.Chrome(chrome_options=chrome_options)

    driver.get(url)
    data = driver.page_source.encode('utf-8')

    driver.close()

    # parser the page source and return them
    soup = BeautifulSoup(data, 'lxml')

    # flight list
    flit_items = soup.find_all('div', class_='flight-list-item clearfix J_FlightItem')
    for flight in flit_items:
        flightdic = {}
        flightdic['日期'] = date
        flightdic['航空公司'] = flight.find_all('span' , class_='J_line J_TestFlight')[0].string
        flightdic['起飞时间'] = date + ' ' + flight.find_all('p', class_='flight-time-deptime')[0].string
        flightdic['到达时间'] = date + ' ' + flight.find_all('span', class_='s-time')[0].string
        flightdic['价格'] = flight.find_all('span', class_='J_FlightListPrice')[0].string
        flightdic['起飞'] = flight.find_all('p', class_='port-dep')[0].string
        flightdic['到达'] = flight.find_all('p', class_='port-arr')[0].string

        if len(flight.find_all('a', class_='link-dot J_Stop')) == 0:
            flightdic['经停'] = 'N'
        else:
            flightdic['经停'] = 'Y'

        flightlist_one.append(flightdic)

    # for list_one in flightlist_one:
    #     print ('航空公司:' + list_one['航空公司'],
    #            '起飞时间:' + list_one['起飞时间']
    #        )

    # return one day's flights
    return flightlist_one


def main():

    flights_list_all = []   # finally all flights will be installed into one list

    start_date = '2018-05-05'   # start search date
    end_date = '2018-05-06'     # end search date
    from_place_code = 'HGH'     # from place
    to_place_code = 'SIA'       # end place

    for current_date in datelist(start_date,end_date):
        flights_list_one = spider_flight(from_place_code,to_place_code,current_date)
        flights_list_all.append(flights_list_one)

    for list_one_day in flights_list_all:
        for dic_one in list_one_day:
            print (
                '日期：' + dic_one['日期'] + '      ',
                '航空公司:' + dic_one['航空公司'] + '      ',
                '起飞时间:' + dic_one['起飞时间'] + '      ',
                '到达时间:' + dic_one['到达时间'] + '      ',
                '价格:' + dic_one['价格'] + '      ',
                '起飞:' + dic_one['起飞'] + '      ',
                '到达:' + dic_one['到达'] + '      ',
                '经停:' + dic_one['经停'] + '      '
               )

main()
```



## Case 3

批量下载麦子学院的学习视频

``` python
import requests
from bs4 import BeautifulSoup
import re
import os

header = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 '
                      '(KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}



# get the course list for each subject
def get_course_list(url):
    response = requests.get(url, header)
    response.encoding = 'utf-8'

    soup = BeautifulSoup(response.text, 'lxml')
    course_list = soup.find_all(class_='smallCourseCatalog')[0].find_all('li')
    course_list_format = []

    for course in course_list:
        course_dic = {}
        course_dic['course_url'] = 'http://m.maiziedu.com' + course.find_all(name='a')[0]['href']
        course_dic['course_duration'] = course.find_all(name='span')[0].string.strip()
        a, b = course.stripped_strings
        course_dic['course_name'] = b

        # get the video url
        response = requests.get(course_dic['course_url'], header)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'lxml')
        course_dic['course_videourl'] = soup.find_all(class_='course-banner')[0].find_all('video')[0]['src']

        course_list_format.append(course_dic)
    return course_list_format





# main ()
urls = ['http://m.maiziedu.com/course/ml-all/0-1/',
       'http://m.maiziedu.com/course/ml-all/0-2/',
       'http://m.maiziedu.com/course/ml-all/0-3/']

last_list = []

for url in urls:
    response = requests.get(url, header)
    response.encoding = 'utf-8'

    all_list_format = []

    soup = BeautifulSoup(response.text, 'lxml')
    all_list = soup.find_all(name='article', class_='course_list')[0].find_all(name='li')

    for list in all_list:
        main_dic = {}
        course_lists = {}
        main_dic['main_url'] = 'http://m.maiziedu.com' + list.find_all(name='a')[0]['href']
        main_dic['main_name'] = list.find_all(name='strong')[0].string.strip()
        #main_dic['main_desc'] = list.find_all(name='p')[0].string.strip()

        #get the course lists
        course_lists = get_course_list(main_dic['main_url'])
        main_dic['course_list'] = course_lists

        all_list_format.append(main_dic)


    main_path = r'C:\Users\admin\Desktop\kecheng\machinelearning'
    for list_format in all_list_format:
        folder = main_path + '\\' + list_format['main_name']
        if not os.path.exists(folder):
            os.makedirs(folder)

        for course in list_format['course_list']:

            last_dic = {}
            last_dic['url'] = list_format['main_url']
            last_dic['subject'] = list_format['main_name']
            last_dic['course_name'] = course['course_name']
            last_dic['video_url'] = course['course_videourl']
            last_list.append(last_dic)

            video_path = folder + '\\' + course['course_name'] + '.mp4'
            r = requests.get(course['course_videourl'], stream=True)
            f = open(video_path, "wb")
            for chunk in r.iter_content(chunk_size=512):
                if chunk:
                    f.write(chunk)

            print (last_dic)

#----------------------------------requirments----------------------------------
# 介绍： 这是用来批量下载麦子学院的视频 （m.maizi.xxx 这个网站可下载付费视频）
# 主要是 requests + beautifulsoup的使用； 同时下载文件到本地文件夹
#--------------------------------------------------------------------------------


# -------------------------------------------上面是循环下载整个主题下的视频，下面的function是下载单个课程的代码
def down_single():

	header = {
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Accept-Language': 'zh-CN,zh;q=0.8',
			'Connection': 'keep-alive',
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 '
						  '(KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
	}

	url = 'http://m.maiziedu.com/course/313/'


	response = requests.get(url, header)
	response.encoding = 'utf-8'

	soup = BeautifulSoup(response.text, 'lxml')
	course_list = soup.find_all(class_='smallCourseCatalog')[0].find_all('li')
	course_list_format = []

	for course in course_list:
		course_dic = {}
		course_dic['course_url'] = 'http://m.maiziedu.com' + course.find_all(name='a')[0]['href']
		course_dic['course_duration'] = course.find_all(name='span')[0].string.strip()
		a, b = course.stripped_strings
		course_dic['course_name'] = b

		# get the video url
		response = requests.get(course_dic['course_url'], header)
		response.encoding = 'utf-8'
		soup = BeautifulSoup(response.text, 'lxml')
		course_dic['course_videourl'] =  soup.find_all(class_='course-banner')[0].find_all('video')[0]['src']

		course_list_format.append(course_dic)

	main_path = r'D:\Videos\flask入门'
	if not os.path.exists(main_path):
		os.makedirs(main_path)

	for course in course_list_format:

		video_path = main_path + '\\' + course['course_name'] + '.mp4'
		r = requests.get(course['course_videourl'], stream=True)
		f = open(video_path, "wb")
		for chunk in r.iter_content(chunk_size=512):
			if chunk: 
				f.write(chunk)

		print (course)

```

