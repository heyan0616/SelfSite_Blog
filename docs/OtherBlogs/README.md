<template>
    <div class="main">
	    <div class="blog-list">
	    	<div class="blog-details">
			    <img class="blog-image" src="./images/test.jpg" alt="image">
			    <div class="blog-body">
				    <h3 class="blog-title"><a href="/OtherBlogs/articles/test.html">测试文章</a></h3>
				    <div class="blog-meta"><span class="date">Published on: 2020/02/01</span></div>
				    <div class="blog-intro">测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章...</div>
				    <a class="more-link" href="/OtherBlogs/articles/test.html">Read more &rarr;</a>
			    </div><!--//media-body-->
			</div>
	    	<div class="blog-details">
			    <!-- <img class="blog-image" src="./images/test.jpg" alt="image"> -->
			    <div class="blog-body">
				    <h3 class="blog-title"><a href="/OtherBlogs/articles/test.html">测试文章</a></h3>
				    <div class="blog-meta"><span class="date">Published on: 2020/02/01</span></div>
				    <div class="blog-intro">测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章...</div>
				    <a class="more-link" href="/OtherBlogs/articles/test.html">Read more &rarr;</a>
			    </div><!--//media-body-->
			</div>
	    	<div class="blog-details">
			    <img class="blog-image" src="./images/test.jpg" alt="image">
			    <div class="blog-body">
				    <h3 class="blog-title"><a href="/OtherBlogs/articles/test.html">测试文章</a></h3>
				    <div class="blog-meta"><span class="date">Published on: 2020/02/01</span></div>
				    <div class="blog-intro">测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章，测试文章...</div>
				    <a class="more-link" href="/OtherBlogs/articles/test.html">Read more &rarr;</a>
			    </div><!--//media-body-->
			</div>
	    </div><!--//media-->	  			    
	    <!-- <nav class="">
		  <a class="" href="index.html">Previous<i class="arrow-prev fas fa-long-arrow-alt-left"></i></a>
		  <a class="" href="blog-list.html">Next<i class="arrow-next fas fa-long-arrow-alt-right"></i></a>
		</nav> -->				 
    </div><!--//main-wrapper--> 
</template>
<style scoped>
    .blog-list{
        float: left;
        width: 73%;
    }
	.blog-details{
		padding: 1.5rem 1rem !important;
		display: flex;
		align-items: flex-start;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 15px;
	}
    .blog-details:hover{
        box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
    }
	.blog-image{
		max-width: 110px !important;
    	border-radius: 2px;
    	margin-right: 1rem !important;
    	display: flex !important;
    	align-items: flex-start;
	}
	.blog-title{
		font-size: 1.275rem;
		margin-bottom: .25rem !important;
		font-weight: bold;
	}
	.blog-title h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
		line-height: 1.2 !important;
		margin-top: 0 !important;
		color: #292929 !important;
    	font-weight: bold;
	}
	.blog-title a{
		color: #292929;
		text-decoration: none;
    	background-color: transparent;
	}
	.blog-meta{
		color: #8f8f8f;
    	font-size: 0.8125rem;
    	margin-bottom: .25rem !important;
	}
	.blog-intro{
		font-size: 0.875rem;
		font-weight: 400;
    	line-height: 1.5;
	}
	.more-link{
		font-size: 0.8125rem;
		color: #5FCB71;
		font-weight: 400;
    	line-height: 1.5;
	}
</style>
