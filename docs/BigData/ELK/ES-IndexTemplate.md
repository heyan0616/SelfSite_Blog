# Elasticsearch Index-Index Template 

::: tip 转载

- [Elasticsearch: Index template](https://www.cnblogs.com/sanduzxcvbnm/p/12085103.html) 

:::

## Elasticsearch: Index template

Index template定义在创建新index时可以自动应用的settings和mappings。 Elasticsearch根据与index名称匹配的index模式将模板应用于新索引。这个对于我们想创建的一系列的Index具有同样的settings及mappings很有帮助。比如我们希望每一天/月的日志的index都具有同样的设置。

```
Log-2020-01
Log-2020-02
Log-2020-03
...
```

Index template仅在index创建期间应用。 对index template的更改不会影响现有索引。 create index API请求中指定的设置和映射会覆盖索引模板中指定的任何设置或映射。

你可以在代码中加入像C语言那样的block注释。你可以把这个注释放在除了开头 “{”和结尾的“}”之间的任何地方。

### 定义一个Index template

我们可以使用如下的接口来定义一个index template：

```
PUT /_template/<index-template>
```

我们可以使用_template这个终点来创建，删除，查看一个index template。下面，我们来举一个例子：

```json
    PUT _template/logs_template
    {
      "index_patterns": "logs-*",
      "order": 1, 
      "settings": {
        "number_of_shards": 4,
        "number_of_replicas": 1
      },
      "mappings": { 
        "properties": {
          "@timestamp": {
            "type": "date"
          }
        }
      }
    }
```

在上面，我们可以看到，我们定义了一个叫做logs_template的index template。它的index_patterns定义为“logs-*”，说明，任何以“logs-”为开头的任何一个index将具有在该template里具有的settings及mappings属性。这里的“order”的意思是：如果索引与多个模板匹配，则Elasticsearch应用此模板的顺序。该值为1，表明有最先合并，如果有更高order的template，这个settings或mappings有可能被其它的template所覆盖。

下面，我们来测试一下我们刚定义的index template：

```
PUT logs-2020-03-01
```

在这里，我们创建了一个叫做logs-2020-03-01的index。我们使用如下的命令来检查被创建的情况：

```
GET logs-2020-03-01
```

显示的结果为：

```json
    {
      "logs-2020-03-01" : {
        "aliases" : { },
        "mappings" : {
          "properties" : {
            "@timestamp" : {
              "type" : "date"
            }
          }
        },
        "settings" : {
          "index" : {
            "creation_date" : "1567652671032",
            "number_of_shards" : "4",
            "number_of_replicas" : "1",
            "uuid" : "Dz5rqRS4SEyLM_gf5eEolQ",
            "version" : {
              "created" : "7030099"
            },
            "provided_name" : "logs-2020-03-01"
          }
        }
      }
    }
```

证如上所示，我们已经成功创建了一个我们想要的index，并且它具有我们之前定义的settings及mappings。

### Index template和alias

我们甚至可以为我们的index template添加index alias：

```json
    PUT _template/logs_template
    {
      "index_patterns": "logs-*",
      "order": 1, 
      "settings": {
        "number_of_shards": 4,
        "number_of_replicas": 1
      },
      "mappings": { 
        "properties": {
          "@timestamp": {
            "type": "date"
          }
        }
      },
      "aliases": {
        "{index}-alias" : {}
      }
    }
```

在上面，我们已经创立了一个叫做{index}-alias的别名。这里的{index}就是实际生成index的文件名来代替。我们下面用一个例子来说明：

```json
PUT logs-2020-04-01
```

我们创建一个叫做logs-2020-04-01的index, 那么它同时生成了一个叫做logs-2020-04-01-alias的别名。我们可以通过如下的命令来检查：

```json
GET logs-2020-04-01-alias
```

显示的结果是：

```json
    {
      "logs-2020-04-01" : {
        "aliases" : {
          "logs-2020-04-01-alias" : { }
        },
        "mappings" : {
          "properties" : {
            "@timestamp" : {
              "type" : "date"
            }
          }
        },
        "settings" : {
          "index" : {
            "creation_date" : "1567653644605",
            "number_of_shards" : "4",
            "number_of_replicas" : "1",
            "uuid" : "iLf-j_G2T4CYcHCqwz32Ng",
            "version" : {
              "created" : "7030099"
            },
            "provided_name" : "logs-2020-04-01"
          }
        }
      }
    }
```

### Index匹配多个template

多个索引模板可能与索引匹配，在这种情况下，设置和映射都合并到索引的最终配置中。 可以使用order参数控制合并的顺序，首先应用较低的顺序，并且覆盖它们的较高顺序。 例如：

```json
    PUT /_template/template_1
    {
        "index_patterns" : ["*"],
        "order" : 0,
        "settings" : {
            "number_of_shards" : 1
        },
        "mappings" : {
            "_source" : { "enabled" : false }
        }
    }
     
    PUT /_template/template_2
    {
        "index_patterns" : ["te*"],
        "order" : 1,
        "settings" : {
            "number_of_shards" : 1
        },
        "mappings" : {
            "_source" : { "enabled" : true }
        }
    }
```

以上的template_1将禁用存储`_source`，但对于以`te *`开头的索引，仍将启用_source。 注意，对于映射，合并是“深度”的，这意味着可以在高阶模板上轻松添加/覆盖特定的基于对象/属性的映射，而较低阶模板提供基础。

我们可以来创建一个例子看看：

```json
PUT test10
GET test10
```

显示的结果是：

```json
    {
      "test10" : {
        "aliases" : { },
        "mappings" : { },
        "settings" : {
          "index" : {
            "creation_date" : "1567654333181",
            "number_of_shards" : "1",
            "number_of_replicas" : "1",
            "uuid" : "iEwaQFl9RAKyTt79PduN-Q",
            "version" : {
              "created" : "7030099"
            },
            "provided_name" : "test10"
          }
        }
      }
    }
```

如果我们创建另外一个不是以 “te”开头的index，我们可以看看如下的情况：

```json
PUT my_test_index
GET my_test_index
```

显示的结果是：

```json
    {
      "my_test_index" : {
        "aliases" : { },
        "mappings" : {
          "_source" : {
            "enabled" : false
          }
        },
        "settings" : {
          "index" : {
            "creation_date" : "1567654713059",
            "number_of_shards" : "1",
            "number_of_replicas" : "1",
            "uuid" : "aSsIZMT2RyWKT44G2dF2zg",
            "version" : {
              "created" : "7030099"
            },
            "provided_name" : "my_test_index"
          }
        }
      }
    }
```

显然在mappings里显示source是被禁止的。

如果对于两个templates来说，如果order是一样的话，我们可能陷于一种不可知论的合并状态。在实际的使用中必须避免。

### 查询Index template接口

我们可以通过如下的接口来查询已经被创建好的index template:

```json
GET /_template/<index-template>
```

比如：

```json
GET /_template/logs_template
```

显示的结果是：

```json
    {
      "logs_template" : {
        "order" : 1,
        "index_patterns" : [
          "logs-*"
        ],
        "settings" : {
          "index" : {
            "number_of_shards" : "4",
            "number_of_replicas" : "1"
          }
        },
        "mappings" : {
          "properties" : {
            "@timestamp" : {
              "type" : "date"
            }
          }
        },
        "aliases" : {
          "{index}-alias" : { }
        }
      }
    }
```

显示的内容就是我们之前已经创建的那个index template。

你也可以通过如下的方式来同时查询多个template的情况：

```json
GET /_template/template_1,template_2
GET /_template/temp*
GET /_template
```

### 删除一个index template

在之前的练习中，我们匹配“*”，也就是我们以后所有的创建的新的index将不存储source，这个显然不是我们所需要的。我们需要来把这个template进行删除。删除一个template的接口如下：

```json
DELETE /_template/<index-template>
```

那么针对我们的情况，我们可以使用如下的命令来删除我们不需要的template:

```json
DELETE _template/template_1
DELETE _template/template_2
```

这样我们删除了我们刚才创建的两个templates。



<br>

<br>

::: tip 转载

- [初探 Elasticsearch Index Template（索引模板)](https://www.jianshu.com/p/1f67e4436c37) 

:::

## 初探 Elasticsearch Index Template（索引模板)

典型使用结构如下所示：

```json
{
  "order": 0,
  "template": "sample_info*",
  "settings": {
    "index": {
      "number_of_shards": "64",
      "number_of_replicas": "1"
    }
  },
  "mappings": {
    "info": {
      "dynamic_templates": [
        {
          "string_fields": {
            "mapping": {
              "analyzer": "only_words_analyzer",
              "index": "analyzed",
              "type": "string",
              "fields": {
                "raw": {
                  "ignore_above": 512,
                  "index": "not_analyzed",
                  "type": "string"
                }
              }
            },
            "match_mapping_type": "string",
            "match": "*"
          }
        }
      ]，
    "properties": {
        "user_province": {
          "analyzer": "lowercase_analyzer",
          "index": "analyzed",
          "type": "string",
          "fields": {
            "raw": {
              "ignore_above": 512,
              "index": "not_analyzed",
              "type": "string"
            }
          }
        }
      }
    }
  },
  "aliases": {}
}
```

上述模板定义，看似复杂，拆分来看，主要为如下几个部分：

```json
{
  "order": 0,                               // 模板优先级
  "template": "sample_info*",               // 模板匹配的名称方式
  "settings": {...},                        // 索引设置
  "mappings": {...},                        // 索引中各字段的映射定义
  "aliases": {...}                          // 索引的别名
}
```

### 1、模板优先级

有时候，一个模板可能绝大部分符合新建索引的需求，但是局部需要微调，此时，如果复制旧的模板，修改该模板后，成为一个新的索引模板即可达到我们的需求，但是这操作略显重复。此时，可以采用模板叠加与覆盖来操作。模板的优先级是通过模板中的 order 字段定义的，数字越大，优先级越高。

如下为定义所有以 te 开头的索引的模板：

```json
{
    "order": 0
    "template" : "te*",
    "settings" : {
        "number_of_shards" : 1
    },
    "mappings" : {
        "type1" : {
            "_source" : { "enabled" : false }
        }
    }
}
```

索引模板是有序合并的。如何想单独修改某一小类索引的一两处单独设置，可以在累加一层模板。

```json
{
    "order" : 1,
    "template" : "tete*",
    "settings" : {
        "number_of_shards" : 2
    },
    "mappings" : {
        "type1" : {
            "_all" : { "enabled" : false }
        }
    }
}
```

上述第一个模板的 order 为0，第二个模板的 order 为1，优先级高于第一个模板，其会覆盖第一个模板中的相同项。所以对于所有以 tete 开头的索引模板效果如下：

```json
{
    "settings" : {
        "number_of_shards" : 2
    },
    "mappings" : {
        "type1" : {
            "_source" : { "enabled" : false },
            "_all" : { "enabled" : false }
        }
    }
}
```

两个模板叠加了，项目的字段，优先级高的覆盖了优先级低的，如分片数。

### **2、索引模板的匹配**

索引模板中的 "template" 字段定义的是该索引模板所应用的索引情况。如 "template": "tete*" 所表示的含义是，当新建索引时，所有以 tete 开头的索引都会自动匹配到该索引模板。利用该模板进行相应的设置和字段添加等。

### **3、setting 部分**

索引模板中的 setting 部分一般定义的是索引的主分片、拷贝分片、刷新时间、自定义分析器等。常见的 setting 部分结构如下：



```json
"settings": {
    "index": {
      "analysis": {...},                // 自定义的分析器
      "number_of_shards": "32",         // 主分片的个数
      "number_of_replicas": "1",        // 主分片的拷贝分片个数
      "refresh_interval": "5s"          // 刷新时间
    }
  }
```

建立的索引，不会立马查到，这是为什么 Elasticsearch 为 near-real-time（接近实时）的原因，需要配置刷新时间，默认的是 1s。setting 的设置中，重点是自定义分析器的设置。
 分析器是三个顺序执行的组件的结合。他们分别是字符过滤器、分词器、标记过滤器。

- 字符过滤器是让字符串在被分词前变得更加整洁。一个分析器可能包含零到多个字符过滤器（character_filter）。
- 分词器将字符串分割成单独的词（terms）或标记（tokens）。一个分析器必须包含一个分词器。
- 分词器分词的结果的标记流会根据各自的情况，传递给特定的标记过滤器。标记过滤器可能修改、添加或删除标记。

创建的创建自定义分析器结构如下：

```json
"settings": {
    "index": {
      "analysis": {
           "char_filter":  { ... },             // 用户自定义字符过滤器
            "tokenizer":   { ... },             // 用户自定义分词器
            "filter":      { ... },             // 用户自定义标记过滤器
            "analyzer":    { ... }              // 用户自定义分析器
      },
      ...
    }
  }
```

#### **1）字符过滤器**

目前字符过滤器共分为三种：映射字符过滤器（mapping char filter）、HTML过滤器（HTML Strip char filter）、格式替换过滤器（Pattern Replace char filter）。html_strip 字符过滤器去除所有的 HTML 标签。

如下定义一个 mapping 字符过去器。将 & 替换成 and。

```json
"char_filter": {
    "&_to_and": {
        "type":       "mapping",
        "mappings": [ "&=> and "]
    }
}
```

mapping 字符过滤器的格式如上，其中 type 字段定义该字符过滤器的类型是 mapping 。其中 mappings 对应的数组为索要替换的字段。

如下在定义一个格式替换过滤器（Pattern Replace Char Filter），将点 "." 替换成空格。

```json
"char_filter": {
    "replace_dot": {
        "pattern": "\\.",
        "type": "pattern_replace",
        "replacement": " "
    }
}
```

格式替换过滤器的格式如上、必须包含 "pattern"、"type"、"replacement" 三个字段。其中 pattern 定义的是满足替换的格式，type 则定义为格式替换类型。replacement 则是对于满足格式的字符串，要替换成的字符串。

#### **2）分词器**

常用的分词器有 standard、keyword、whitespace、pattern等。

standard 分词器将字符串分割成单独的字词，删除大部分标点符号。keyword 分词器输出和它接收到的相同的字符串，不做任何分词处理。whitespace 分词器只通过空格俩分割文本。pattern 分词器可以通过正则表达式来分割文本。最常用的一般为 standard 分词器。

更多的分词器详见官方文档：[https://www.elastic.co/guide/en/elasticsearch/reference/2.4/analysis-standard-tokenizer.html](https://link.jianshu.com?t=https%3A%2F%2Fwww.elastic.co%2Fguide%2Fen%2Felasticsearch%2Freference%2F2.4%2Fanalysis-standard-tokenizer.html)

**3）标记过滤器**

常用的标记过滤器有 lowercase 和 stop 。lowercase 标记过滤器将词转换为小写，stop 标记过滤器用户去除一些自定义停用词或者是语言内定义的停用词。

stop 标记过滤器的常用结构如下：

```json
"filter": {
    "my_stopwords": {
        "type":        "stop",
        "stopwords": [ "the", "a" ]
    }
}
```

上述标记过滤器是自定义的过滤掉 "the" 、"a" 两词。除了自定义，还有特定的语言停用词过滤，相应的有：*spanish* 、*english*等。具体用法如下：

```json
"filter": {
    "my_stop": {
        "type":        "stop",
        "stopwords": _spanish_
    }
}
```

更多的语言停用词参考官方网址：[https://www.elastic.co/guide/en/elasticsearch/reference/2.4/analysis-stop-tokenfilter.html](https://link.jianshu.com?t=https%3A%2F%2Fwww.elastic.co%2Fguide%2Fen%2Felasticsearch%2Freference%2F2.4%2Fanalysis-stop-tokenfilter.html)/

**4）分析器组合**

如上定义了字符过滤器、分词器、标记过滤器之后，就该用户自定义分析器。分析器是由三者按顺序组合而成。

将上述组件组合起来便是：

```json
"analyzer": {
    "my_analyzer": {
        "type":           "custom",
        "char_filter":  [ "html_strip", "&_to_and", "replace_dot" ],
        "tokenizer":      "standard",
        "filter":       [ "lowercase", "my_stopwords", "my_stop" ]
    }
}
```

将自定义分析器各部分完整表示如下：

```json
"settings": {
    "index": {
      "analysis": {
           "char_filter": {
                "&_to_and": {
                    "type":       "mapping",
                    "mappings": [ "&=> and "]
                },
                "replace_dot": {
                    "pattern": "\\.",
                    "type": "pattern_replace",
                    "replacement": " "
                }
            },
            "filter":      {
                "my_stop": {
                    "type":        "stop",
                    "stopwords": _spanish_
                },
                "my_stopwords": {
                    "type":        "stop",
                    "stopwords": [ "the", "a" ]
                }
            },
            "analyzer":    {
                "my_analyzer": {
                    "type":           "custom",
                    "char_filter":  [ "html_strip", "&_to_and", "replace_dot" ],
                    "tokenizer":      "standard",
                    "filter":       [ "lowercase", "my_stopwords", "my_stop" ]
                }
            }
      },
      ...
    }
  }
```

### **4、索引类型的字段映射**

索引模板中，映射字段所对应的常用结构是：

```json
"mappings": {
    "my_type": {                            // 索引下的类型 my_type 应用该映射
      "dynamic_templates": [ ... ],         // 动态映射部分，用于未定义的 my_type 下字段
      "properties": { ... }                 // 自定义字段的响应映射
    }
}
```

"my_type" 是索引下的一个类型，如果采用上述定义的索引模板，则索引下仅仅 my_type 类型应用了该索引模板。如果想要索引下的所有模板应用定义的映射，则可以将 "my_type" 替换成 "*default*" 字段。

#### **1）动态映射**

动态映射 "dynamic_templates" 字段对应的是一个数组，数组中的元素是一个个字段的映射模板。每个字段的映射模板都有一个名字用户描述这个模板的用途，一个 mapping 字段由于指明这个映射如何使用，和至少一个参数（例如 match）来定义这个模板适用于哪个字段。

dynamic_templates 字段对应的字段模板结构如下：

```cpp
{
    "string_fields": {                                  // 字段映射模板的名称，一般为"类型_fields"的命名方式
        "match": "*",                                   // 匹配的字段名为所有
        "match_mapping_type": "string",                 // 限制匹配的字段类型，只能是 string 类型
        "mapping": { ... }                              // 字段的处理方式
 }
```

如下为一个定义实例：

```json
"mappings": {
    "my_type": {
      "dynamic_templates": [
         {
            "string_fields": {                                  // 字段映射模板的名称，一般为"类型_fields"的命名方式
                "match": "*",                                   // 匹配的字段名为所有
                "match_mapping_type": "string",                 // 限制匹配的字段类型，只能是 string 类型
                "mapping": {
                    "fielddata": { "format": "disabled" },      // fielddata 不可用，对于分析字段，其默认值是可用
                    "analyzer": "only_words_analyzer",          // 字段采用的分析器名，默认值为 standard 分析器
                    "index": "analyzed",                        // 索引方式定义为索引，默认值是分析
                    "omit_norms": true,                         // omit_norms 为真表示考虑字段的加权，可分析字段默认值 false
                    "type": "string",                           // 字段类型限定为 string
                    "fields": {                                 // 定义一个嵌套字段，将该字段应用于不分析的场景
                        "raw": {
                            "ignore_above": 256,                // 忽略字段对应的值长度大于256的字段
                            "index": "not_analyzed",            // 索引方式为不分析
                            "type": "string",                   // 字段的类型为 string
                            "doc_values": true                  // 对于不分析字段，doc_values 对应的是一种列式存储结构，默认false
                        }
                    }
                }
            }
        }，
        ...
      ],
      "properties": { ... }
    }
}
```

可以看到，内部的字段模板的 mapping 字段下包含 fielddata、analyzer、index、omit_norms、type、fields 等六个字段，下面分别解释这六个字段。

对于基本的 Elasticsearch 做个了解，一般的 es 用户搜索字段，其反应数据非常快，接近实时，这个效果得益于其倒排索引的数据结构，然而倒排索引这个数据结构在做聚合分析时，却不是那么容易。因而在做传统分析时，需要一种我们常见的行式存储结构，这一结构在排序和巨额和分析时，具有明显的优势。这一部分详见 [Elasticsearch 搜索与聚合在数据存储结构方面的理解](https://www.jianshu.com/p/76ab92de2786) 。

**fielddata** 这一字段就是对于分析字段，除了倒排索引的数据存储方式，仍定义一种形式上看着是行式结构的存储样式，数据存储在内存中，用于对字段的排序和聚合分析。对于分析字段 fielddata 的默认值是可用的。如果确定一个分析字段不需要排序或者聚合分析，则该字段就设置为不可用。这样可以节省内存。

**analyzer** 定义的是该字段的分析器，默认的分析器是 standard 标准分析器，这个地方可定义为自定义的分析器。

**index** 定义的是字段的索引方式。默认的 ，Elasticsearch 对字段采取的是分析索引，即会对字段进行倒排索引。

**omit_norms** 定义的是字段在分析过程中，是否考虑加权。例如如果权重为2，字段出现的频率在计算时会翻倍，以提高计算的匹配度。对于分析字段，默认的是不考虑加权。

**type** 定义的是字段的数据类型。

**fields** 是字段应以一个嵌入字段。以  title 字段为例，Elasticsearch 会自动生成两个字段，分别是 title 和 title.raw 。这样，在有可能同时需要分词和不分词结果的环境，就可以很灵活的使用不同的索引字段。比如，查看标题中最常用的单词，应该是使用 title 字段，查看阅读数最多的文章标题，应该是使用 title.raw 字段。

**ignore_above** 字段是索引时忽略长度超过定义值的字段。

**doc_values** 字段与 fielddata 相对应，都是为了字段方便排序和聚合分析而重新定义的一种数据存储方式，不同的是，fielddata 应用于分析字段，存储在内存中；doc_values 应用于不分析字段，存储于磁盘中。

上述是针对字段数据类型为 string 的动态模板定义，对于其他数据类型，其动态模板的定义方式一般如下：

```json
{
    "float_fields": {                               // 命名方式 "类型_fields"
        "match": "*"，
        "match_mapping_type": "float",
        "mapping": {
            "type": "float",
            "doc_values": true                      // doc_values 定义为 true，便于排序与聚合分析
        }
    }
}
```

#### **2）自定义字段映射**

针对索引类型中存在的字段，除了可以采用动态模板的方式，还可以采用定义定义的方式，常见的自定义结构如下：

```json
"mappings": {
    "my_type": {
      "dynamic_templates": [ ... ],
      "properties": {
          "user_city": {                                // 字段名
             "analyzer": "lowercase_analyzer",          // 字段分析器
             "index": "analyzed",                       // 字段索引方式定义索引
             "type": "string",                          // 字段数据类型定义为 string
             "fields": {                                // 定义一个名为 user_city.raw 的嵌入的不分析字段
                "raw": {
                    "ignore_above": 512,
                    "index": "not_analyzed",
                    "type": "string"
                }
            }
         }，
         "money":{
            "type": "double",
            "doc_values": true
         }
         ...
      }
    }
}
```

复杂一些的是 string 类型的字段，对于其他类型的字段，定义方式类似于上述的 money 字段定义方式。

### **5、别名**

即使你认为现在的索引设计已经是完美的了，当你的应用在生产环境使用时，还是有可能在今后有一些改变的。所以请做好准备：在应用中使用别名而不是索引。然后你就可以在任何时候重建索引。别名的开销很小，应当广泛使用。利用索引别名，可以实现零停机时间重新索引。

定义方式如下：

```json
{
  "order": 0,                               // 模板优先级
  "template": "sample_info*",               // 模板匹配的名称方式
  "settings": {...},                        // 索引设置
  "mappings": {...},                        // 索引中各字段的映射定义
  "aliases": {
     "my_index":{}
  }
}
```

零停机时间实现重新索引方式：

```json
POST /_aliases
{
    "actions": [
        { "remove": { "index": "my_index_v1", "alias": "my_index" }},
        { "add":    { "index": "my_index_v2", "alias": "my_index" }}
    ]
}
```

<br>

<br>



::: tip 转载

- [**Index Template 和 Dynamic Template**](https://www.yuque.com/xiongsanxiansheng/qfvqxo/llgddg) 

:::

集群上的索引会随着时间越来越多，例如，会为你的日志每天创建一个索引。使用多个素银可以更好的管理数据，提高性能，例如：logs-2019-05-01、logs-2019-05-02。

## **Index Template 和 Dynamic Template**

### **1. Index Template**

#### 1.1 什么是Index Template？

- Index Template：帮助你设定 Mapping 和 Settings，并按照一定的规则自动匹配到新创建的索引上
  - Mappings 主要作用于字段的信息说明；
  - Settings 主要作用于 index 的一些相关配置信息，如分片数、副本数，tranlog 同步条件、refresh 等；
  - 模板尽在一个索引被新创建时，才会产生作用。修改模板不会影响已创建的索引；
  - 你可以设定多个索引模板，这些设置会被 "merge" 在一起；
  - 你可以指定 "order" 的数值，控制 "merging" 的过程；

#### 1.2 Index Template的工作方式

- 当一个索引被新创建时
  - 使用 Elasticsearch 默认的 settings 和 mappings
  - 使用 order 数值低的 Index Template 中的设定
  - 使用 order 数值高的 Index Template 中的设定，之前的设定会被覆盖 
  - 创建索引时，用户如果自己配置 settings 和 mappings，并覆盖之前模板中的设定

> 只要索引名字满足模板中的正则表达式，就会在索引创建时自动触发索引模板。

``` json
#插入数据
PUT ttemplate/_doc/1
{
  "someNumber":"1",
  "someDate":"2019/01/01"
}

#查看Dynamic Mapping，数字字符串被映射成text，日期字符串被映射成日期
GET ttemplate/_mapping

#创建2个Index Template
#创建一个默认的 default template
PUT _template/template_default
{
  "index_patterns": ["*"],
  "order" : 0,
  "version": 1,
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas":1
  }
}

#创建template_test模板
PUT /_template/template_test
{
    "index_patterns" : ["test*"],
    "order" : 1,
    "settings" : {
      "number_of_shards": 1,
      "number_of_replicas" : 2
    },
    "mappings" : {
      "date_detection": false,
      "numeric_detection": true
    }
}

#查看template信息
GET /_template/template_default
GET /_template/temp*


#写入新的数据，index以test开头
PUT testtemplate/_doc/1
{
  "someNumber":"1",
  "someDate":"2019/01/01"
}
#数字转成long，日期字符串转成text
GET testtemplate/_mapping
#primary：1, replica: 2
GET testtemplate/_settings


#创建一个临时索引test*开头，会触发template_test模板
PUT testmy
{
  "settings":{
    "number_of_replicas":5
  }
}

PUT testmy/_doc/1
{
  "key":"value"
}

#查看replica: 5
GET testmy/_settings

#清理
DELETE testmy
DELETE /_template/template_default
DELETE /_template/template_test
```



### 2. Dynamic Template

#### 2.1 什么是 Dynamic Template？

- 根据 ES 识别的数据类型，结合字段名称，来动态设定字段类型，例如：
  - 所有的字符串类型都设定成 keyword，或者关闭 keyword 字段
  - is 开头的字段都设置成 boolean
  - long_ 开头的都设置成 long 类型



#### 2.2 Dynamic Template设定

- Dynamic Template 是定义在某个索引的 Mapping 中；
- Template 有一个名称；
- 匹配规则是一个数组，参数如下：
  - match_mapping_type：自动识别文档中的字段值在对应匹配到 ES 中的类型，如 string、boolean 等；
  - match，unmatch：寻找匹配文档有没有对应匹配的字段名；
  - path_match，patch_unmatch：结合路径去匹配字段名

- 为匹配到字段设置 Mapping；

> - 注意 template 数组中的顺序：
>   - 模板按照顺序来检测，第一个匹配的模板会被优先启用；
>   - 例如，我们给 string 类型字段定义两个模板：
>     - strings_as_boolean：以 is 开头的字段名会映射成 boolean；
>     - strings_as_keywords：所有其他 text 字段映射成 keyword；
>   - 我们将 string_as_boolean 模板放在第一位，因为它比匹配所有字符串字段的 strings_as_keyword 模板更特殊。





<style scoped>
  h3 {
      text-decoration: underline;
  }
  h4{
    	color: #00578a;
  }
</style>