module.exports = {
  title: "Yan's Blog Home",
  description : 'Personal blog site',
  base : '/',
  markdown: {
    lineNumbers: true,
    externalLinks: { target: '_self', rel: 'noopener noreferrer' }
  },
  themeConfig : {
    nav : [
    	// {
     //        text: '技术主题',
     //        items: [
     //            { 
     //            	text: 'Java相关', items: [
     //            		{ text: 'index', link: '/Java/' },
     //            	]
     //            },
     //            { 
     //            	text: 'Architect相关', items: [
     //            		{ text: 'index', link: '/Architect/' },
     //            	]
     //            },
     //            { 
     //            	text: '数据存储', items: [
     //            		{ text: 'index', link: '/DataStorage/' },
     //            	]
     //            },
     //            { 
     //            	text: 'DevOps', items: [
     //            		{ text: 'index', link: '/DevOps/' },
     //            	]
     //            },
     //            { 
     //            	text: '分布式', items: [
     //            		{ text: 'index', link: '/DistributedSystem/' },
     //            	]
     //            },
     //            { 
     //            	text: '前端', items: [
     //            		{ text: 'index', link: '/Frontend/' },
     //            	]
     //            },
     //            { 
     //            	text: '微服务相关', items: [
     //            		{ text: 'index', link: '/Microservice/' },
     //            	]
     //            },
     //            { 
     //            	text: 'Monitor', items: [
     //            		{ text: 'index', link: '/Monitor/' },
     //            	]
     //            },
     //            { 
     //            	text: 'Python', items: [
     //            		{ text: 'index', link: '/Python/' },
     //            	]
     //            },
     //            { 
     //            	text: '一些知识', items: [
     //            		{ text: 'index', link: '/SomeKnowledges/' },
     //            	]
     //            }
     //        ],
     //    },
     	{ text: 'Blog Home', link: '/', target:'_self' },
        { text: 'Technical Blog Home', link: '/index/', target:'_self' },
        { text: 'Other Blog Home', link: 'https://heyan.site:8003/', target:'_self' },
        { text: '留言', link: '/comments', target:'_self' },
        { text: 'Site Home', link: 'http://heyan.site/', target:'_self' },
    ],
    sidebarDepth : 2,
	sidebar:{
		'/index/':[
			{
				title: 'Index',
				collapsable: true,
				sidebarDepth : 2,
				children: [
					'/index/',
				]
			},
			{
				title: 'Start',
				collapsable: true,
				children: [
					'/start/BuildThisSiteTech',
					'/start/BuildThisSiteNonTech',
					'/start/CentosDockerInstall',
					'/start/PushLocalImageToAliyun',
					'/start/HttpsUpgrade',
					'/start/AddBlogComment',
					'/start/BlogDeployment',
					'/start/V2RayWithGoogleCloud',
				]
			},
			{
				title: 'Development Language',
				collapsable: true,
				children: [
					'/DevLanguage/Java/',
					'/DevLanguage/Python/',
				]
			},
			{
				title: 'Frontend',
				collapsable: true,
				children: [
					'/Frontend/React/',
					'/Frontend/Vue/',
					'/Frontend/Nodejs/',
					'/Frontend/Webpack/',
				]
			},
			{
				title: 'Architect',
				collapsable: true,
				children: [
					'/Architect/LoadBalance'
				]
			},
			{
				title: 'Data Storage',
				collapsable: true,
				children: [
					'/DataStorage/Overview',
					'/DataStorage/neo4j/',
				]
			},
			{
				title: 'Microservice',
				collapsable: true,
				children: [
					'/Microservice/'
				]
			},
			{
				title: 'Distributed System',
				collapsable: true,
				children: [
					'/DistributedSystem/Theory/',
					'/DistributedSystem/ZookeeperEtcdRelated/',
					'/DistributedSystem/DistributedMessageStreamPlatform/',
					'/DistributedSystem/Hadoop/',
				]
			},
			{
				title: 'Big Data',
				collapsable: true,
				children: [
					'/BigData/Splunk/',
					'/BigData/ELK/',
				]
			},
			{
				title: 'DevOps',
				collapsable: true,
				children: [
					'/DevOps/Docker/',
					'/DevOps/Ansible/',
					'/DevOps/Git/',
				]
			},
			{
				title: 'Machine Learning',
				collapsable: true,
				children: [
					'/MachineLearning/'
				]
			},			
			{
				title: 'Some Knowledges',
				collapsable: true,
				children: [
					'/SomeKnowledges/'
				]
			},
		],
		'/start/':[
			{
				title: 'Start',
				collapsable: true,
				children: [
					'/start/',
					'/start/BuildThisSiteTech',
					'/start/BuildThisSiteNonTech',
					'/start/CentosDockerInstall',
					'/start/PushLocalImageToAliyun',
					'/start/HttpsUpgrade',
					'/start/AddBlogComment',
					'/start/BlogDeployment',
					'/start/V2RayWithGoogleCloud',
				]
			},
			['/index/', '< 首页'],		
		],
		'/DevLanguage/Java/':[
			{
				title: 'Java',
				collapsable: true,
				children: [
					'/DevLanguage/Java/',
				]
			},
			{
				title: 'Java Basic',
				collapsable: true,
				children: [
					'/DevLanguage/Java/JavaBasic/',
					'/DevLanguage/Java/JavaBasic/Java基础-集合1',
					'/DevLanguage/Java/JavaBasic/Java基础-集合2',
					'/DevLanguage/Java/JavaBasic/Java基础-IO流1',
					'/DevLanguage/Java/JavaBasic/Java基础-IO流2',
					'/DevLanguage/Java/JavaBasic/Java基础-反射.md',
					'/DevLanguage/Java/JavaBasic/Java基础-注解.md',
					'/DevLanguage/Java/JavaBasic/Java基础-泛型.md',
					'/DevLanguage/Java/JavaBasic/Java基础-JVM.md',
				]
			},
			{
				title: 'Java NIO',
				collapsable: true,
				children: [
					'/DevLanguage/Java/JavaNIO/',
					'/DevLanguage/Java/JavaNIO/ZeroCopy',
					'/DevLanguage/Java/JavaNIO/Java网络编程.md',
					'/DevLanguage/Java/JavaNIO/JavaBIO.md',
					'/DevLanguage/Java/JavaNIO/JavaNIO-概述.md',
					'/DevLanguage/Java/JavaNIO/JavaNIO-Buffer.md',
					'/DevLanguage/Java/JavaNIO/JavaNIO-Channal.md',
					'/DevLanguage/Java/JavaNIO/JavaNIO-Selector.md',
					'/DevLanguage/Java/JavaNIO/JavaNIO-Path&Files.md',
					'/DevLanguage/Java/JavaNIO/JavaNIO-Samples.md',
					'/DevLanguage/Java/JavaNIO/NIO vs IO.md',
					'/DevLanguage/Java/JavaNIO/IOTheory.md',
					'/DevLanguage/Java/JavaNIO/IOModelAndThreadModel.md',
					'/DevLanguage/Java/JavaNIO/JavaAIO.md',
				]
			},
			{
				title: 'Java 并发',
				collapsable: true,
				children: [
					'/DevLanguage/Java/Java并发/',
					'/DevLanguage/Java/Java并发/0-多线程相关.md',
					'/DevLanguage/Java/Java并发/0-什么是线程安全.md',
					'/DevLanguage/Java/Java并发/0-并发相关.md',
					'/DevLanguage/Java/Java并发/0-JMM.md',
				]
			},
			{
				title: 'Spring',
				collapsable: true,
				children: [
					'/DevLanguage/Java/Spring/',
					'/DevLanguage/Java/Spring/SpringFramework.md',
					'/DevLanguage/Java/Spring/SpringBoot.md',
					'/DevLanguage/Java/Spring/SpringCloudNetflix.md',
					'/DevLanguage/Java/Spring/SpringCloudAlibaba.md',
				]
			},
			['/index/', '< 首页'],
		],
		'/DevLanguage/Python/':[
			{
				title: 'Python',
				collapsable: true,
				children: [
					'/DevLanguage/Python/',
				]
			},
			{
				title: 'Python爬虫',
				collapsable: true,
				children: [
					'/DevLanguage/Python/Spider/',
					'/DevLanguage/Python/Spider/Requests',
					'/DevLanguage/Python/Spider/BeautifulSoup',
				]
			},
			['/index/', '< 首页'],
		],
		'/Frontend/':[
			{
				title: '前端',
				collapsable: true,
				children: [
					'/Frontend/',
				]
			},
			{
				title: 'React',
				collapsable: true,
				children: [
					'/Frontend/React/',
					'/Frontend/React/React',
				]
			},
			{
				title: 'Vue',
				collapsable: true,
				children: [
					'/Frontend/Vue/',
					'/Frontend/Vue/VueStart',
				]
			},
			{
				title: 'Nodejs',
				collapsable: true,
				children: [
					'/Frontend/Nodejs/',
					'/Frontend/Nodejs/Nodejs',
				]
			},
			{
				title: 'Webpack',
				collapsable: true,
				children: [
					'/Frontend/Webpack/',
					'/Frontend/Webpack/Webpack',
				]
			},
			['/index/', '< 首页'],
		],
		'/DevOps/':[
			{
				title: 'DevOps',
				collapsable: true,
				children: [
					'/DevOps/',
				]
			},
			{
				title: 'Docker',
				collapsable: true,
				children: [
					'/DevOps/Docker/',
					'/DevOps/Docker/Docker',
					'/DevOps/Docker/Docker_Enter',
					'/DevOps/Docker/Docker_Commands',
					'/DevOps/Docker/DockerCase_Nginx',
					'/DevOps/Docker/DockerCase_Springboot',
					'/DevOps/Docker/Docker_Compose',
					'/DevOps/Docker/Docker_Machine',
				]
			},
			{
				title: 'Ansible',
				collapsable: true,
				children: [
					'/DevOps/Ansible/',
					'/DevOps/Ansible/AnsibleStart',
				]
			},
			{
				title: 'Git',
				collapsable: true,
				children: [
					'/DevOps/Git/',
					'/DevOps/Git/GitUsage',
					'/DevOps/Git/GitCase',
				]
			},
			['/index/', '< 首页'],
		],
		'/Architect/':[
			{
				title: '负载均衡',
				collapsable: true,
				children: [
					'/Architect/LoadBalance.md',
				]
			},
			['/index/', '< 首页'],		
		],
		'/DistributedSystem/':[
			{
				title: '分布式系统',
				collapsable: true,
				children: [
					'/DistributedSystem/',
				]
			},
			{
				title: '分布式系统理论',
				collapsable: true,
				children: [
					'/DistributedSystem/Theory/',
					'/DistributedSystem/Theory/DistributedVsCluster.md',
					'/DistributedSystem/Theory/ACID-CAP-一致性-BASE',
					'/DistributedSystem/Theory/ConsistencyAlgorithm',
				]
			},
			{
				title: '分布式协调服务',
				collapsable: true,
				children: [
					'/DistributedSystem/ZookeeperEtcdRelated/',
					'/DistributedSystem/ZookeeperEtcdRelated/zk_1',
					'/DistributedSystem/ZookeeperEtcdRelated/zk_2',
					'/DistributedSystem/ZookeeperEtcdRelated/zk_3',
					'/DistributedSystem/ZookeeperEtcdRelated/zk_4',
					'/DistributedSystem/ZookeeperEtcdRelated/zk_vs_etcd',
				]
			},
			{
				title: '分布式消息/流平台',
				collapsable: true,
				children: [
					'/DistributedSystem/DistributedMessageStreamPlatform/',
					'/DistributedSystem/DistributedMessageStreamPlatform/MQTheory',
					'/DistributedSystem/DistributedMessageStreamPlatform/Kafka',
					'/DistributedSystem/DistributedMessageStreamPlatform/Pulsar',
				]
			},
			{
				title: '分布式系统基础框架Hadoop',
				collapsable: true,
				children: [
					'/DistributedSystem/Hadoop/',
					'/DistributedSystem/Hadoop/HadoopInstall.md',
					'/DistributedSystem/Hadoop/hdfs.md',
					'/DistributedSystem/Hadoop/MapReduce.md',
					'/DistributedSystem/Hadoop/MapReduce-sample.md',
					'/DistributedSystem/Hadoop/hive.md',
					'/DistributedSystem/Hadoop/hbase.md',
				]
			},
			['/index/', '< 首页'],		
		],
		'/DataStorage/':[
			{
				title: '数据存储',
				collapsable: true,
				children: [
					'/DataStorage/',
					'/DataStorage/Overview.md',
				]
			},
			{
				title: 'Neo4j',
				collapsable: true,
				children: [
					'/DataStorage/neo4j/',
					'/DataStorage/neo4j/GraphDatabase',
					'/DataStorage/neo4j/Neo4jStart.md',
					'/DataStorage/neo4j/Cypher.md',
					'/DataStorage/neo4j/NorthwindGraph.md',
				]
			},			
			['/index/', '< 首页'],		
		],
		'/BigData/':[
			{
				title: 'Big Data',
				collapsable: true,
				children: [
					'/BigData/',
				]
			},
			{
				title: 'Splunk',
				collapsable: true,
				children: [
					'/BigData/Splunk/',
					'/BigData/Splunk/SplunkStart',
				]
			},
			{
				title: 'ELK',
				collapsable: true,
				children: [
					'/BigData/ELK/',
				]
			},				
			['/index/', '< 首页'],		
		],
		'/SomeKnowledges/':[
			{
				title: 'Some Knowledges',
				collapsable: true,
				children: [
					'/SomeKnowledges/',
					'/SomeKnowledges/MacAlert',
					'/SomeKnowledges/LinuxCommands',
					'/SomeKnowledges/Markdown',
				]
			},
			['/index/', '< 首页'],		
		],
	}
  }
}