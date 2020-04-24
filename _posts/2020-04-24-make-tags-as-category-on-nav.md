---
layout: post
title: tags를 카테고리로 활용하자.
tags: [beautifuljekyll, jekyll]
---

현재 사용중인 [beadutiful-jekyll theme](https://deanattali.com/beautiful-jekyll/)에서 tags들로 정리된 카테고리가 하나있으면 좋겠다 싶어서 시도.

### 참고 자료 
 - [https://jekyllrb.com/docs/variables/](https://jekyllrb.com/docs/variables/)
 - [https://djkeh.github.io/articles/Hangul-test-jekyll-tips-kor/](https://djkeh.github.io/articles/Hangul-test-jekyll-tips-kor/)

### 접근 방법

Site variable 정의 파악

 - site.pages, site.posts, **site.tags.TAG**, site.\<custom_value_name\> 과 같이 정의하고 싶은 변수를 config.yml (yml : 데이터 저장 포맷) 에 저장

원하는 위치에 코드를 가져 옴

 - tags는 tags 페이지에서 힌트를 얻음.
 
    {% highlight html linenos %}
    {% raw %}
        {%- capture site_tags -%}
            {%- for tag in site.tags -%}
                {{- tag | first -}}{%- unless forloop.last -%},{%- endunless -%}
            {%- endfor -%}
        {%- endcapture -%}
        {%- assign tags_list = site_tags | split:',' | sort -%}

        {%- for tag in tags_list -%}
        <a href="#{{- tag -}}" class="btn btn-primary tag-btn"><i class="fa fa-tag" aria-hidden="true"></i>&nbsp;{{- tag -}}&nbsp;({{site.tags[tag].size}})</a>
        {%- endfor -%}
    {% endraw %}
    {% endhighlight %}
    
해당 코드를 nav에 적용 (nav.html)

 - html 필요한 부분 custom 후 입력

    {% highlight html linenos %}
    {% raw %}
        <!-- 태그 카테고리 -->
        {%- capture site_tags -%}
        {%- for tag in site.tags -%}
            {{- tag | first -}}{%- unless forloop.last -%},{%- endunless -%}
        {%- endfor -%}
        {%- endcapture -%}
        {%- assign tags_list = site_tags | split:',' | sort -%}

        {% if tags_list.size > 0 %}
        <li class="navlinks-container">
            <a class="navlinks-parent text-uppercase" href="javascript:void(0)">Tags</a>
            <div class="navlinks-children abs-right-align">
            {%- for tag in tags_list -%}
            <a class="text-capitalize" href="/tags/#{{- tag -}}">{{- tag -}}&nbsp;({{site.tags[tag].size}})</a>
            {%- endfor -%}
            </div>
        </li>
        {% endif %}
    {% endraw %}
    {% endhighlight %}

main.js에서 해당부분 조정
 
 - 필자는 부모 element의 min-width에 맞춰서 자식 element width 까지 일렬로 맞추는 게 불만이라 (보통 위쪽 제목이 더 간결한 경우가 많으니) 자식 element width를 찾아 min-width를 계산해 적용.
 
    {% highlight javascript linenos %}
     // Ensure nested navbar menus are not longer than the menu header
    var menus = $(".navlinks-container");
    if (menus.length > 0) {
      var navbar = $("#main-navbar ul");
      var fakeMenuHtml = "<li class='fake-menu' style='display:none;'><a></a></li>";
      navbar.append(fakeMenuHtml);
      var fakeMenu = $(".fake-menu");

      $.each(menus, function(i) {
        var parent = $(menus[i]).find(".navlinks-parent");
        var children = $(menus[i]).find(".navlinks-children a");
        var words = [];
        // 태그 갯수 세는 html에 space가 하나 있어서 해당 split 생략
        // $.each(children, function(idx, el) { words = words.concat($(el).text().trim().split(/\s+/)); });
        $.each(children, function(idx, el) { words = words.concat($(el).text().trim()); });
        var maxwidth = 0;
        $.each(words, function(id, word) {
          console.log(word);
          fakeMenu.html("<a>" + word + "</a>");
          var width =  fakeMenu.width();
          if (width > maxwidth) {
            maxwidth = width;
          }
        });
        // 자식 element 를 찾아 min-width 적용.
        $(menus[i]).find(".navlinks-children").css('min-width', maxwidth + 'px')
      });

      fakeMenu.remove();
    }
    {% endhighlight %}

나머지 미세한 css들 조정(main.css & custom bootstrap에서 조정)

    {% highlight css linenos %}
    .navbar-custom .nav li a {
        /* 일괄 대문자 적용이 마음에 들지 않아 생략하고 각 a tag 성격 마다 다르게 적용되도록 함.*/
        /* text-transform: uppercase; */
        font-size: 12px;
        letter-spacing: 1px;
    }
    {% endhighlight %}



적용하고나니 여전히 수정할 점이 많지만 사이트가 한결 낫다.