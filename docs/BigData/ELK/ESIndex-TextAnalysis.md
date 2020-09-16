# ES Index-Text Analysis

::: tip 转载

- [https://www.yuque.com/xiongsanxiansheng/qfvqxo/mpst8x](https://www.yuque.com/xiongsanxiansheng/qfvqxo/mpst8x) 
- [https://www.elastic.co/guide/en/elasticsearch/reference/7.9](https://www.elastic.co/guide/en/elasticsearch/reference/7.9.html)

:::

文本分析是将非结构化文本 (如电子邮件的正文或产品描述) 转换为结构化格式，以便于搜索的过程。如果索引中包含文本字段，或者文本搜索没有返回预期的结果，就可以通过配置文本 Analysis 来微调搜索。

## 1. Text Analysis 概述

文本分析让 Elasticsearch 能够执行全文搜索，返回所有相关结果，而不仅仅是精确匹配。

- 精确匹配
  - 2017-01-01，exact value，搜索的时候，必须输入 2017-01-01，才能搜索出来。如果你输入一个 01，是搜索不出来的；
- 全文搜索
  - 就不是说单纯的只是匹配完整的一个值，而是可以对值进行拆分词语后（分词）进行匹配，也可以通过缩写、时态、大小写、同义词等进行匹配；
  - 你在文本里搜索 Quick fox jumps，可能不仅希望返回包含 quick foxs 的文档，也希望返回 fox leap 的文档，因为 jump 和 leap 是同义词，相同意思的也满足需求可以作为结果返回；

### 1.1 Tokenization

- 文本分析通过 tokenization 分词操作，让全文搜索变成了可能。
- Tokenization 分词操作，将文本分解成更小的块，称为 token，大多情况下，这些 token 是单独的单词。
- 将一段句子拆分成一个一个的单个的单词，并分别将每个单词编入索引，只要匹配到一个搜索关键词就可以匹配到结果。

### 1.2 Normalization

- 切分词语后，文本分析就可以对单个 token 进行匹配，但是每个 token 的匹配也只是进行字面意义上的直接比较；
- 我们希望可以在匹配关键词时，可以忽略大小写，时态，同时只要与搜索词相近意思的也符合条件，将结果返回；
- 为了解决这个问题，文本分析将切分词语后的 token 转化为一个标准化的格式，这允许匹配到与搜索词不完全相同但足够相似的相关 token，例如：
  - Quick 小写化：quick；
  - foxes 简化它的词根：fox；
  - jump、leap 这样的同义词，可以作为一个单词进行索引：jump；
- 为了确保搜索词与这些 token 匹配，可以对搜索短语使用相同的分词和规范化规则，例如，搜索短语 Foxes leap 会被规范化为搜索关键词 fox jump；

### 1.3 自定义文本分析

- 文本分析是由分词器执行的，分词器包含一组规则来控制文本分析的过程；
- ES 默认分词器是 <font color='red'> standard analyzer </font>；
- 如果想自定义文本分析，可以使用其他的内置分词器，或者使用一个自定义的分词器；
- 一个自定义的分词器可以控制文本分析的每一步，包括：
  - 在 tokenization 之前对文本进行修改；
  - 控制文本的切词规则；
  - 在索引 token 前，对 token 进行规范化；



## 2. Text Analysis 基本概念

### 2.1 Analyzer 组成

无论是内置的，还是自定义的 Analyzer 都是由底层的三个模块组成：character filters, tokenizers, and token filters；

我们可以自己组合这些模块来定义新的自定义 Analyzer；

#### 1）Character filters

- 针对原始文本进行处理，例如去除 HTML 标记；
- 一个 Analyzer 可以由 0 个或多个 character filter，按顺序使用；
- [**《内置的 Character filter 详解》**](/BigData/ELK/ES-TextAnalysis.html#内置-character-filter-详解)

#### 2）Tokenizer

- 分词器，将接收的文本按照一定的规则进行切分；
- Tokenizer 还负责记录每个 token 在文本中的顺序和位置，以及 token 所代表的原始单词的开始字符与结束字符的偏移量；
- 一个 Analyzer 文本分析器只能有一个 Tokenizer 分词器；
- [**《内置的 Tokenizer 详解》**](/BigData/ELK/ES-TextAnalysis.html#内置-tokenizer-详解)

#### 3）Token filters

- 针对切分的单词进行加工，比如转为小写、删除 stopwords、增加同义词;
- 规范化操作 Normalization；
- Token filters 不允许改变每个 token 记录在 Tokenizer 中的位置或字符偏移量；
- 一个 Analyzer 可以有 0 个或多个 Token filters，它们按顺序使用；
- [**《内置的 Token filter 详解》**](/BigData/ELK/ES-TextAnalysis.html#内置-token-filter-详解)

### 2.2 Stemming 词干分析

- Stemming，就是将一个单词还原成它的词根形式的过程，这是 **Normalization** 规范化中的一种方式。
  - 例如：walking 和 walked 有相同的词根 walk，一旦进行了词根分析，任何一个词的出现都将在搜索中与另一个词匹配；
- Stemming 词干分析虽然依赖于语言，但是通常需要移除单词的前缀和后缀；
- 某些情况下，一些词的被词干分析后得到的词根不是一个正确的单词，但它在搜索中并不重要，如果一个单词的所有变体都简化为相同的词根形式，那么它们也将正确匹配；
  - 例如：jumping 和 jumpiness 经过词干分析后都是 jumpi，但 jumpi 不是一个正确的单词，但是不影响搜索；
- **Stemmer token filters**，token 词干过滤器，es 中的词干分析过程是由它来处理的，有以下几类：
  - Algorithmic stemmers 算法词干分析器，根据一组规则进行词干分析；
  - Dictionary stemmers 字典词干分析器，通过查字典来对单词进行词干还原；

#### 1）Algorithmic stemmers

- 算法词干分析器对每个单词应用一系列规则，将其简化为根形式。   
  - 例如，用于英语的 Algorithmic stemmers 可能会从复数单词的末尾去掉 -s 和 -es 后缀；

- 优势：
  - 很少的配置，而且可以在大多数情况下满足需求；
  - 占用的内存很少；
  - 通常比 Dictionary stemmers 要快；

- 缺点：
  - 大多数的 Algorithmic stemmers 只能对包含词根的单词进行简化，如果是不包含词根的不规则单词，那么就不能进行转化，例如：
    - be, are, and am；
    - mouse and mice；
    - foot and feet；

- 以下 token filters 使用了 Algorithmic stemmers：
  - stemmer，它为几种语言提供算法词干分析；
  - kstem，一种用于英语的词干分析器，它将算法词干分析与内置字典结合在一起；
  - **porter_stem**，**官方推荐**的**英语**词干分析器；
  - snowball，它为几种语言使用基于滚雪球的词干分析规则；

#### 2）Dictionary stemmers

- 字典词干分析器在提供的字典中查找单词，用字典中的词根单词替换未词根化的单词变体；
- 理论上，Dictionary stemmers 很适合以下情况;
  - 对不规则的单词进行词干分析；
  - 区分拼写很像，但是概念上不相关的词，例如:
    - organ、organization；
    - broker、broken；

- 实际上，**Algorithmic stemmers 的表现通常优于 Dictionary stemmers**。这是因为 Dictionary stemmers 有以下的缺点：
  - 字典的质量
    - Dictionary stemmers 好坏取决于它的字典。为了发挥作用，这些词典必须包含大量的单词，定期更新，并随语言趋势而变化。通常情况下，当一本词典问世时，它已经是不完整的，它的一些条目已经过时了。
  - 大小和性能
    - Dictionary stemmers 必须将字典中的所有单词、前缀和后缀加载到内存中。这可能会使用大量的RAM。低质量的字典可能在移除前缀和后缀的时候效率也很低，这可能会大大降低词干分析的速度。

- hunspell，就是使用的字典词干分析器；
  - **官方建议**：在使用 hunspell 前，先试试 Algorithmic stemmers；

> 有时，词干分析会产生拼写类似但在概念上不相关的共享根词。例如，stemmer 会将 skies 和 skiing 简化为同一个词根：ski。
>
> 为了防止这种情况并更好地控制词根分析，可以使用以下的 token filters：
>
> - stemmer_override，它允许您定义针对特定 token 进行词干分析的规则；
> - keyword_marker，它将特定的 tokens 定义为 keyword，keyword 类型的 tokens 将不会被后续的 stemmer token filters 处理；
> - conditional，与 keyword_marker 类似，将 tokens 定义为 keyword 类型；
>
> 对于内置的词干分析器，可以使用 [stem_exclusion](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html#_excluding_words_from_stemming) 参数来指定一个不会被词根化的单词列表；

### 2.3 Token graphs 分词图

- 当 tokenizer 分词器将文本切分成 token 流时，它还会记录以下信息：
  - position：每个 token 在 token 流中的位置；
  - positionLength，token 在 token 流占的位置个数；
- 使用 position 和 positionLength，就可以为一个 token 流生成一个 token graph，每一个 position 代表一个节点，每个 token 代表一个指向下一个 position 的边；

<div style="display:flex;"><img src="https://www.elastic.co/guide/en/elasticsearch/reference/7.9/images/analysis/token-graph-qbf-ex.svg" alt="" style="zoom:100%;display:block;" align="left"/></div>

#### 1）Synonyms 同义词

- 一些 token filter 会向 token stream 中添加一些新的 token（例如，同义词）。这些新增的 token 的 position 通常与它们的同义词分布在相同的位置。

<div style="display:flex;"><img src="https://www.elastic.co/guide/en/elasticsearch/reference/7.9/images/analysis/token-graph-qbf-synonym-ex.svg" alt="" style="zoom:100%;display:block;" align="left"/></div>

#### 2）Multi-position tokens 横跨多个position的token

- 一些 token filter 会向 token stream 中添加一些横跨多个 position 的 token。这类 token 通常时一些单词组成的词组的缩写，例如：atm 是 automatic teller machine 的同义词。
- 但是，只有某些 token filter 才能被称为 graph token filter，会准确的记录这类 multi_position token 的 positionLength：
  - [synonym_graph](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-synonym-graph-tokenfilter.html)
  - [word_delimiter_graph](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-word-delimiter-graph-tokenfilter.html) 
- 举例，domain name system 和它的同义词 dns，它们的 position 都是0，然而，dns 的 positionLength 是3，其他的 token 都是默认 positionLength 为1。

<div style="display:flex;"><img src="https://www.elastic.co/guide/en/elasticsearch/reference/7.9/images/analysis/token-graph-dns-synonym-ex.svg" alt="" style="zoom:100%;display:block;" align="left"/></div>

#### 3）搜索中使用 token graph 

- 索引时，是会忽略 positionLength 信息，而且不支持包含横跨多个 position 的 token 的 token graph。
- 但是，查询时，例如 match、match_phrase，会从想要查询的字符串中生成多个 token graph （包括 multi_position tokens 的 graph），借此创建多个子查询。
- 举例，使用 match_phrase 查询：domain name system is fragile
  - 在对搜索字符串进行文本分析时，domain name system 的同义词 dns 会被添加到查询文本的 token stream 中，dns 的 positionLength 是3,如下图
  - match_phrase 查询会使用这个 graph 生成多个子查询，这意味着匹配到的文档更加的全面。

<div style="display:flex;"><img src="https://www.elastic.co/guide/en/elasticsearch/reference/7.9/images/analysis/token-graph-dns-synonym-ex.svg" alt="" style="zoom:100%;display:block;" align="left"/></div>

```json
dns is fragile
domain name system is fragile
```

#### 4）Invalid token graphs

- 下面的 token filter 可以添加跨越多个位置的 token (如 dns)，但只记录默认的 positionLength 为1:
  - [synonym](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-synonym-tokenfilter.html)
  - [word_delimiter](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-word-delimiter-tokenfilter.html)

- 这意味着如果 token stream 包含 domain name system 这样的词组时，也会向 token stream 中添加同义词 token（dns），但是 dns 的 positionLength 是默认值 1，导致 token graph 是错误的；

  <div style="display:flex;"><img src="https://www.elastic.co/guide/en/elasticsearch/reference/7.9/images/analysis/token-graph-dns-invalid-ex.svg" alt="" style="zoom:100%;display:block;" align="left"/></div>

- 无效的 token graph 可能导致意外的搜索结果，要避免使用。

## 3. 配置 Text Analysis

- 一般情况下，ES 提供的默认分析器 standard analyzer 可以满足大部分的使用需求；
- 如果一些内置的分析器也无法满足需求，可以使用 ES 提供的一些 option 选项功能来对 analyzer 进行微调
- 例如，给 standard analyzer 配置 stop words 的自定义移除列表；
- 最后就是，可以通过组合 analyzer 的底层模块来定制自己的分析器；

### 3.1 使用 Analyzer API 测试

#### 1）测试内置的 Analyzer：

```json
POST _analyze
{
  "analyzer": "whitespace",
  "text":     "The quick brown fox."
}
```

#### 2）测试自定义组合模块

- 也可以组合 tokenizer、character filter、token filter 来进行测试：
  - 一个 tokenizer 分词器；
  - 0 或多个 token filter；
  - 0 或多个 character filter；

``` json
POST _analyze
{
  "tokenizer": "standard",
  "filter":  [ "lowercase", "asciifolding" ],
  "text":      "Is this déja vu?"
}
######返回结果
{
  "tokens": [
    {
      "token": "is",
      "start_offset": 0,
      "end_offset": 2,
      "type": "<ALPHANUM>",
      "position": 0
    },
    {
      "token": "this",
      "start_offset": 3,
      "end_offset": 7,
      "type": "<ALPHANUM>",
      "position": 1
    },
    {
      "token": "deja",
      "start_offset": 8,
      "end_offset": 12,
      "type": "<ALPHANUM>",
      "position": 2
    },
    {
      "token": "vu",
      "start_offset": 13,
      "end_offset": 15,
      "type": "<ALPHANUM>",
      "position": 3
    }
  ]
}
```

> - Analyzer 不仅将文本切分成了 tokens，还记录一些额外的信息：
>   - 每个 token 的顺序或相对位置：用于词组查询或者是同义词查询；
>   - 每个 token 在原始文本中的 start、end 字符的偏移量：用于搜索词命中的高亮显示处理；

#### 3）测试自定义Analyzer

- 在一个索引中自定义一个 Analyzer，然后可以针对这个索引使用 Analyzer API 对 Custom Analyzer 进行测试：

  ``` json
  # settings 中定义一个analyzer叫做std_folded
  # mappings 中 my_text 字段使用这个自定义的 analyzer
  PUT my_index
  {
    "settings": {
      "analysis": {
        "analyzer": {
          "std_folded": { 
            "type": "custom",
            "tokenizer": "standard",
            "filter": [
              "lowercase",
              "asciifolding"
            ]
          }
        }
      }
    },
    "mappings": {
      "properties": {
        "my_text": {
          "type": "text",
          "analyzer": "std_folded" 
        }
      }
    }
  }
  # my_index索引中使用 _analyzer 测试方式1：通过analyzer名称
  GET my_index/_analyze 
  {
    "analyzer": "std_folded", 
    "text":     "Is this déjà vu?"
  }
  # my_index索引中使用 _analyzer 测试方式2：通过字段名，这个字段要在mappings中配置好使用自定义anaylzer
  GET my_index/_analyze 
  {
    "field": "my_text", 
    "text":  "Is this déjà vu?"
  }
  ```

### 3.2 配置内置的 Analyzer

- [**内置 Analyzer 详解**](/BigData/ELK/ES-TextAnalysis.html#内置-analyzer-详解)；

- 内置的 Analyzer 可以通过配置 options 选项参数来对分析器进行微调：

  ``` json
  PUT my_index
  {
    "settings": {
      "analysis": {
        "analyzer": {
          "std_english": { 
            "type":      "standard",
            "stopwords": "_english_"
          }
        }
      }
    },
    "mappings": {
      "properties": {
        "my_text": {
          "type":     "text",
          "analyzer": "standard", 
          "fields": {
            "english": {
              "type":     "text",
              "analyzer": "std_english" 
            }
          }
        }
      }
    }
  }
  
  POST my_index/_analyze
  {
    "field": "my_text", 
    "text": "The old brown cow"
  }
  
  POST my_index/_analyze
  {
    "field": "my_text.english", 
    "text": "The old brown cow"
  }
  ```

  > - 在 standard analyzer 基础上定义了一个名为 std_english Analyzer，并为它配置上 ES 预定义的 english stopwords 移除列表；
  > - my_text 字段使用 standard Analyzer 分词，不会移除 stopwords，结果：[ the, old, brown, cow ]；
  > - my_text.english 子字段使用自定义的 std_english Analyzer，所以 English stopwords 会被移除，结果：[ old, brown, cow ]

### 3.3 配置自定义的 Analyzer

#### 1）配置项

- **tokenizer**（必选项）：一个内置或者自定义的 tokenizer；
- **char_filter**（非必选）：0个或多个内置、自定义的 character filter 组成的数组；
- **filter**（非必选）：0个或多个内置、自定义的 token filter 组成的数据；
- **position_increment_gap**：默认值100。如果一个字段是由多个 text 组成的数组，那么在索引时，ES 会给 text元素之间插入一个假空隙，使得两个元素之间的 position 保持一个距离，以防止搜索词组时跨越多个元素进行匹配。`可以在 Mappings 中为 text 字段修改 position_increment_gap 的值`。例如：
  - 有字段值：[ "John Abraham", "Lincoln Smith"]；
  - match_phrase 搜索："Abraham Lincoln"；
  - 因为 ES 在元素间插入了间隙，所以不会跨元素搜索，没有匹配的结果；
  - 如果 match_phrase 添加参数 "slop": 101，那么就会把整个数组的所有元素当作一个 text 去匹配，元素间的 position 没有间隙。会匹配到结果。

#### 2）一个比较复杂的例子

- **Character Filter**
  - 自定义一个名称为 emoticons 的 Character Filter，其类型是 `Mapping Character Filter`，将 ":)" 表情符转换为 "_happy_"， ":(" 表情符转换为 "_sad_"；

- **Tokenizer**
  - 自定义一个名称为 punctuation 的 Tokenizer，其类型是 `Pattern Tokenizer`，根据数组中的空格及标点符号 [ .,!?] 进行分词；

- **Token Filters**
  - 内置的 `Lowercase Token Filter`
  - 自定义一个名为 english_stop 的 Token Filter，其类型是 `Stop Token Filter`, 使用 ES 预定义的 English stop words 移除列表；

> 字段值："I'm a :) person, and you?"
>
> 分词结果：[ i'm, _happy_, person, you ]

``` json
UT my_index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_custom_analyzer": { 
          "type": "custom",
          "char_filter": [
            "emoticons"
          ],
          "tokenizer": "punctuation",
          "filter": [
            "lowercase",
            "english_stop"
          ]
        }
      },
      "tokenizer": {
        "punctuation": { 
          "type": "pattern",
          "pattern": "[ .,!?]"
        }
      },
      "char_filter": {
        "emoticons": { 
          "type": "mapping",
          "mappings": [
            ":) => _happy_",
            ":( => _sad_"
          ]
        }
      },
      "filter": {
        "english_stop": { 
          "type": "stop",
          "stopwords": "_english_"
        }
      }
    }
  }
}

POST my_index/_analyze
{
  "analyzer": "my_custom_analyzer",
  "text": "I'm a :) person, and you?"
}
```

### 3.4 指定 Analyzer

- ES 提供了不同 level、不同场景下指定内置，或者自定义的 Analyzer：
  - 字段、索引、查询 level；
  - 索引时，查询时；

> - **尽量保持简单**
>   - 虽然 ES 可以灵活的在不同 level、场景下指定 Analyzer，但是非必要的情况下不要这么做，尽量保持简单；
>   - 大多数情况下，最简单最好的方法：为每个 text 字段指定一个 Analyzer；
>   - 而且，ES 默认的 Analyzer 配置也很好，索引和搜索使用相同的 Analyzer；
>   - 可以使用 GET my_index/_mapping 查看字段具体使用的 Analyzer；

#### 1）ES 如何确定 Index 的 Analyzer?

- ES 通过按顺序检查下面的参数，来确定索引时使用什么 Analyzer：
  - mappings 中字段的 analyzer 参数；
  - settings 中 analysis.analyzer.default 参数；
  - 如果这些都没有设定，那么就使用默认的 standard analyzer；

**(1) 为字段指定 Analyzer**

```json
PUT my_index
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "whitespace"
      }
    }
  }
}
```

**(2) 为 Index 指定默认 Analyzer**

``` json
UT my_index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "default": {
          "type": "simple"
        }
      }
    }
  }
}
```

#### 2）ES 如何确定 Search 的 Analyzer?

> - 通常没必要在 Search 时指定一个与 Index 不同的 Analyzer
>   - 这样做，会对相关性造成负面的影响，导致预期外的搜索结果；
>   - 如果为 Search 单独指定了一个 Analyzer，官方建议在上线前对文本分析多进行测试。

- ES 通过按顺序检查下面的参数，来确定搜索时使用什么 Analyzer：
  - search query 中的 analyzer 参数；
  - mappings 中字段的 search_analyzer 参数；
  - settings 中 analysis.analyzer.default_search 参数；
  - mappings 中字段的 analyzer 参数；
  - 如果这些都没有设定，那么就使用默认的 standard analyzer；

**(1) 为 query 指定 Search Analyzer**

**(2) 为字段指定 Search Analyzer**

> 如果在 mappings 中为字段配置了 search_analyzer，那么该字段的 analyzer 也必须配置；

**(3) 为 Index 指定 default Search Analyzer**

> 如果在 settings 中指定了索引的默认 Search Analyzer，那么 settings 中的 analysis.analyzer.default 也必须设置；



<br>

<br>

## 内置 Analyzer 详解

### 1. Fingerprint analyzer

- Fingerprint analyzer 实现了 fingerprinting 算法 (OpenRefine项目中使用)。
- 使用该 analyzer 场景下，文本会被转为小写格式，经过规范化 (normalize) 处理之后移除扩展字符，然后再经过排序，删除重复数据组合为单个 token；如果配置了停用词，则停用词也将会被移除。

- **底层组成模块：**
  - Tokenizer：Standard Tokenizer；
  - Token Filters：
    - Lower Case Token Filter
    - ASCII folding
    - Stop Token Filter ( 默认未开启 )
    - Fingerprint

- **可配置参数：**

| **参数**        | **参数说明**                                                 |
| --------------- | ------------------------------------------------------------ |
| separator       | 连接多个词(term)的字符，默认为空格                           |
| max_output_size | token 允许的最大值,超过该值将直接被丢弃，默认值为255         |
| stopwords       | 预定义的停用词，可以为0个或多个，例如 _english_ 或停用词数组，默认值为_none_ |
| stopwords_path  | 停用词文件路径                                               |

- **举个例子：**

  ``` json
  #配置索引默认Analyzer，移除english停用词列表中的词
  PUT my_index
  {
    "settings": {
      "analysis": {
        "analyzer": {
          "my_fingerprint_analyzer": {
            "type": "fingerprint",
            "stopwords": "_english_"
          }
        }
      }
    }
  }
  
  POST my_index/_analyze
  {
    "analyzer": "my_fingerprint_analyzer",
    "text": "Yes yes, Gödel said this sentence is consistent and."
  }
  #######文本处理后是一个去重、排序、小写化、移除扩展符和stopword的单个token
  {
    "tokens" : [
      {
        "token" : "consistent godel said sentence yes",
        "start_offset" : 0,
        "end_offset" : 52,
        "type" : "fingerprint",
        "position" : 0
      }
    ]
  }
  ```

- 如果通过配置参数来微调 Fingerprint Analyzer 已经满足不了需求的话，可以通过组合底层模块来重建一个类似 Fingerprint 的自定义 Analyzer，通常可以靠添加 token filter 来改变它；

  ``` json
  PUT /fingerprint_example
  {
    "settings": {
      "analysis": {
        "analyzer": {
          "rebuilt_fingerprint": {
            "tokenizer": "standard",
            "filter": [
              "lowercase",
              "asciifolding",
              "fingerprint"
            ]
          }
        }
      }
    }
  }
  ```

### 2. Keyword analyzer

- Keyword analyzer 视字符串为一个整体不进行分词处理；
- **底层组成模块：**
  - Tokenizer：Keyword Tokenizer
- **没有可配置参数**
- 也可以重建 keyword analyzer，通过添加 token filter 来定制需求：



``` json
PUT /keyword_example
{
  "settings": {
    "analysis": {
      "analyzer": {
        "rebuilt_keyword": {
          "tokenizer": "keyword",
          "filter": []
        }
      }
    }
  }
}
```

### 3. Language analyzer

- Language analyzer 是特定类型语言的分词器，支持以下语系：支持以下类型：阿拉伯语、亚美尼亚语、巴斯克语、孟加拉语、巴西语、保加利亚语、加泰罗尼亚语、中日韩语、捷克语、丹麦语、荷兰语、英语、爱沙尼亚语、芬兰语、法语、加利西亚语、德语、希腊语、印地语、匈牙利语、印度尼西亚语、爱尔兰语、意大利语、拉脱维亚语、立陶宛语、挪威语、波斯语、葡萄牙语、罗马尼亚语、俄语、索拉尼语、西班牙语、瑞典语、土耳其语、泰语。
- 可配置参数：

| **参数**       | **参数说明**                                                 |
| -------------- | ------------------------------------------------------------ |
| stopwords      | ES 内部预定义的停用词，可以为0个或多个，例如 _english_ 或自定义的stopword 数组 |
| stopwords_path | 使用外部的 stopwords 文件                                    |
| stem_exclusion | 部分语言支持在词干提取时忽略一组小写格式的单词列表           |

- 重建 Language analyzer，例如，如果你不想做词干转化（相当于 stem_exclusion），那么就可以在自定义 Analyzer 中移除 keyword_marker token filter；
- **举例：**
  - english analyze
    - 自定义的 token filter 中，english_keywords 一般不要使用，除非你想把其中的单词不做词干分析处理；

### 4. Pattern analyzer

- Pattern analyzer 使用正则表达式作为文本分词规则；
- 注意：正则表达式匹配的应该是 token 分隔符，而不是去匹配 token 本身，`默认正则为 \W+ (匹配非单词字符)`；
- Pattern analyzer 使用的是 Java 正则表达式；
- 注意：糟糕的正则表达式可能会运行的很慢，甚至会抛出异常并导致运行终止；

<br>

- **底层模块组成：**
  - Tokenizer：Pattern Tokenizer；
  - Token Filter：
    - Lower Case Token Filter;
    - Stop Token Filter；(默认未启用)

- 重建 Pattern Analyzer：



- 可配置参数：

| **参数**       | **参数说明**                                                 |
| -------------- | ------------------------------------------------------------ |
| pattern        | java正则表达式，默认为 \W+                                   |
| flags          | java正则当中的 flags，flags应该用 \| 分割，如"CASE_INSENSITIVE\|COMMENTS" |
| lowercase      | 分隔出的词(term)是否以小写形式表示，默认为true               |
| stopwords      | 预定义的停用词，可以为0个或多个，例如_english_或数组类型值，默认值为_none_ |
| stopwords_path | 停用词外部文件路径                                           |

- 举例：
  - 简单例子：正则匹配 非单词 或 "_" 作为分隔符来切分单词，并且转化小写；
    - **注意：**`正则表达式在 JSON 字符串中，反斜杠 "\" 需要用转义字符`；
  - 复杂例子：将文本以驼峰命名的规则进行切分单词；
    - 正则表达式解释说明：

### 5. Simple analyzer

- Simple analyzer 是根据非字母字符（如数字、空格、连字符和撇号）对文本进行拆分，且将处理的所有关 token 转换成小写格式
- **无可配置参数**
- **底层模块组成：**
  - Tokenizer：Lowercase Tokenizer；
- 重建 Simple analyzer：根据需求添加 token filter；



### 6. Standard analyzer

- Standard analyzer 是 ES 默认的 analyzer，它提供了基于语法的切分词处理（基于 Unicode 文本分割算法），并且适用于大多数语言。
- **可配置参数：**

| **参数**         | **参数说明**                                                 |
| ---------------- | ------------------------------------------------------------ |
| max_token_length | token 最大长度，如果超过此长度的 token，则按照最大长度再次拆分，默认值255 |
| stopwords        | 预定义的停用词，可以为0个或多个，例如_english_或数组类型值，默认值为_none_ |
| stopwords_path   | 停用词外部文件路径                                           |

- **底层模块组成：**
  - Tokenizer：Standard Tokenizer；
  - Token filter：
    - Lowercase Token filter；
    - Stop Token filter；（默认未启用）

- **举例：**

### 7. Stop analyzer

- stop analyzer 与 simple analyzer 功能一样，不同之处在于支持停用词，默认情况下使用 _english_ 停用词；
- **可配置参数：**

| **参数**       | **参数说明**                                                 |
| -------------- | ------------------------------------------------------------ |
| stopwords      | 预定义的停用词，可以为0个或多个，例如_english_或数组类型值，默认值为_none_ |
| stopwords_path | 停用词外部文件路径                                           |

- **底层模块组成：**
  - Tokenizer：Lowercase Tokenizer；
  - Token filter：Stop Token filter；

- **举例：**

### 8. Whitespace analyzer

- Whitespace analyzer 根据空白字符将文本拆分；
- **没有可配置参数**
- **底层模块组成：**
  - Tokenizer：Whitespace Tokenizer；
- 重建：



<br>

<br>

## 内置 Character filter 详解

### 1. HTML strip character filter

- **html_strip**，从文本中剥离 HTML 元素并用其解码值替换HTML实体（例如，用 &amp 替换 &）。
- 可选参数：

| **参数**     | **参数说明**                                                 |
| ------------ | ------------------------------------------------------------ |
| escaped_tags | （可选，字符串数组）不带尖括号（<>）的HTML元素数组。当从文本中剥离HTML时，过滤器将跳过这些HTML元素。例如，["p"]值跳过< p >HTML元素。 |

``` json
PUT my_index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_analyzer": {
          "tokenizer": "keyword",
          "char_filter": [
            "my_custom_html_strip_char_filter"
          ]
        }
      },
      "char_filter": {
        "my_custom_html_strip_char_filter": {
          "type": "html_strip",
          "escaped_tags": [
            "b"
          ]
        }
      }
    }
  }
}

GET my_index/_analyze
{
  "analyzer": "my_analyzer",
  "text" : "<p>I&apos;m so <b>happy</b>!</p>"
}
#结果：[ \nI'm so <b>happy</b>!\n ]
```

### 2. Mapping character filter

- **mapping**，接受键和值的映射。每当遇到与键相同的字符串时，它会用与该键关联的值替换它们。
- 使用的贪婪匹配；
- 允许替换成空字符串；
- 可选参数：
  - 必须指定此 mappings 或 mappings_path 参数

| **参数**      | **参数说明**                                                 |
| ------------- | ------------------------------------------------------------ |
| mappings      | （必需*，字符串数组）映射数组，每个元素的格式为key=>value。  |
| mappings_path | （必需*，字符串）包含键=>值映射的文件的路径。此路径必须是相对于配置位置的绝对路径或相对路径，并且文件必须是UTF-8编码的。文件中的每个映射都必须用换行符分隔。 |

```json
PUT /my_index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_analyzer": {
          "tokenizer": "standard",
          "char_filter": [
            "my_mappings_char_filter"
          ]
        }
      },
      "char_filter": {
        "my_mappings_char_filter": {
          "type": "mapping",
          "mappings": [
            ":) => _happy_",
            ":( => _sad_"
          ]
        }
      }
    }
  }
}

GET /my_index/_analyze
{
  "tokenizer": "keyword",
  "char_filter": [ "my_mappings_char_filter" ],
  "text": "I'm delighted about it :("
}
#结果：[ I'm delighted about it _sad_ ]
```

### 3. Pattern replace character filter

- **pattern_replace**，使用正则表达式匹配应替换为指定替换字符串的字符；
  - 替换字符串可以引用正则表达式中的捕获组。
- 使用 Java 正则表达式；
- 写得不好的正则表达式可能运行得非常慢，甚至会抛出 StackOverflowError 并导致运行它的节点突然退出。
- 可选参数：

| **参数**    | **参数说明**                                                 |
| ----------- | ------------------------------------------------------------ |
| pattern     | Java 正则表达式                                              |
| replacement | 替换字符串，它可以使用$1..$9语法引用捕获组                   |
| flags       | Java 正则表达式中的 flags，例如 "CASE_INSENSITIVE\|COMMENTS" |

- 举例：123-456-789 → 123_456_789

```json
# (?=pattern)正向肯定匹配，"Windows(?=95|98|NT|2000)"能匹配"Windows2000"中的"Windows"，
# 但不能匹配"Windows3.1"中的"Windows"。
PUT my_index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_analyzer": {
          "tokenizer": "standard",
          "char_filter": [
            "my_char_filter"
          ]
        }
      },
      "char_filter": {
        "my_char_filter": {
          "type": "pattern_replace",
          "pattern": "(\\d+)-(?=\\d)",
          "replacement": "$1_"
        }
      }
    }
  }
}

POST my_index/_analyze
{
  "analyzer": "my_analyzer",
  "text": "My credit card is 123-456-789"
}
#结果：[ My, credit, card, is, 123_456_789 ]
```

- 使用替换字符串来更改原始文本的长度对于搜索来说是有效的，但是会导致不正确的高亮显示，如下例所示
  - 此示例在遇到小写字母后跟大写字母时插入空格（即fooBarBaz→foo Bar Baz），允许单独查询camelCase单词

```json
PUT my_index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_analyzer": {
          "tokenizer": "standard",
          "char_filter": [
            "my_char_filter"
          ],
          "filter": [
            "lowercase"
          ]
        }
      },
      "char_filter": {
        "my_char_filter": {
          "type": "pattern_replace",
          "pattern": "(?<=\\p{Lower})(?=\\p{Upper})",
          "replacement": " "
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "text": {
        "type": "text",
        "analyzer": "my_analyzer"
      }
    }
  }
}

POST my_index/_analyze
{
  "analyzer": "my_analyzer",
  "text": "The fooBarBaz method"
}
#结果：[ the, foo, bar, baz, method ]
```

```json
PUT my_index/_doc/1?refresh
{
  "text": "The fooBarBaz method"
}

GET my_index/_search
{
  "query": {
    "match": {
      "text": "bar"
    }
  },
  "highlight": {
    "fields": {
      "text": {}
    }
  }
}
#高亮结果出错 Ba，因为 character filter 改变了原始文本的长度；
{
  "highlight": {
    "text": [
      "The foo<em>Ba</em>rBaz method" 
    ]
  }
}
```





<br>

<br>

## 内置 Tokenizer 详解

### 1. Character group tokenizer

- 定义一个字符集合，每当遇到一个集合中的字符，**char_group** tokenizer 就会将文本进行拆分；
- 它主要用于，当你想使用 pattern tokenizer 但是它的性能又比较低的时候，就可以使用 char_group tokenizer 自定义一个简单的分词器来满足类似 pattern 的需求；
- **可选配置：**

| **参数**          | **参数说明**                                                 |
| ----------------- | ------------------------------------------------------------ |
| tokenize_on_chars | 用作分割符的字符集合，它的值可以是单个字符(如，"-")，也可以是whitesapce(" " or "\n")，letter(a, b, ï or 京)，digit(3 or 7)，punctuation(! or ")，symbol($ or √) |

- **举例：**

```json
POST _analyze
{
  "tokenizer": {
    "type": "char_group",
    "tokenize_on_chars": [
      "whitespace",
      "-",
      "\n"
    ]
  },
  "text": "The QUICK brown-fox"
}
#####结果：[The,QUICK,brown,fox]
```

### 2. Classic tokenizer

- **classic** tokenizer，可以说是为英语而生的分词器。这个分词器对于英文的首字符缩写、 公司名字、 email 、 大部分网站域名都能很好的解决。 但是，对于英语之外的其他语言，就不是很好使。
- **可选参数：**

| **参数**         | **参数说明**                 |
| ---------------- | ---------------------------- |
| max_token_length | token允许的最大长度，默认255 |

- **举例：**

```json
PUT my_index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_analyzer": {
          "tokenizer": "my_tokenizer"
        }
      },
      "tokenizer": {
        "my_tokenizer": {
          "type": "classic",
          "max_token_length": 5
        }
      }
    }
  }
}

POST my_index/_analyze
{
  "analyzer": "my_analyzer",
  "text": "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
}
######结果：[ The, 2, QUICK, Brown, Foxes, jumpe, d, over, the, lazy, dog's, bone ]
```

### 3. Edge n-gram tokenizer

- **edge_ngram** tokenizer，会根据配置项 token_chars 中定义的指定字符集合来对文本进行拆分，然后对每个拆分后的单词进行 N-grams 处理，N-grams 处理后的 token 都是以单词的首字母作为开始；
- Edge N-Grams 适用于 search-as-you-type 查询
- 但是当你键入的文本是类似电影名、歌曲名这类广为人知的被人熟悉的词时，completion suggester 是比 Edge N-Grams 更有效率的选择；
- Edge N-Grams 处理普通单词的 autocomplete 时比较合适；
- **可选参数：**

| **参数**           | **参数说明**                                                 |
| ------------------ | ------------------------------------------------------------ |
| min_gram           | gram分词后允许的最小长度，默认值1                            |
| max_gram           | gram分词后允许的最大长度，默认值2                            |
| token_chars        | ES将会以不在字符类型所属的字符为分割符，默认值：[]，保持文本内容不变；例如，digit，会以非数字的字符作为分割符切分文本，token 中一定包含 digit；支持：<br>letter —  for example a, b, ï or 京<br/>digit —  for example 3 or 7<br/>whitespace —  for example " " or "\n"<br/>punctuation — for example ! or "<br/>symbol —  for example $ <br/>custom —  custom characters which need to be set using the custom_token_chars setting. |
| custom_token_chars | **尚不明白用法**                                             |

> - max_gram 参数的限制：
>   - max_gram 限制了 token 的最大长度，例如 apple 做 N-Grams 处理后的词就是：[a, ap]；
>   - 如果将 edge_ngram tokenizer 作为 Index Analyzer，那么搜索关键词（如 apple）长于 max_gram 时，可能没有任何能匹配的结果；
>   - 面对上面的情况，又两种解决办法：
>     - 搜索的时候，使用 truncate token filter 作为 search analyzer，将搜索关键词（如 apple）裁剪长度到 max_gram （如 ap）；但是这种情况会返回很多不相关的结果（如 apply，snapped）;
>     - 索引的时候将 max_gram 增大，这样处理完的 token 仍会保留完整的单词（如 apple：[a,ap,app,appl,apple]），搜索的时候使用不同于索引时的 analyzer，搜索使用 standard analyzer 就可以将关键词 apple 匹配到正确的结果；



> - 通常 ES 建议 Search Analyzer 要与 Index Analyzer 保持一致；
> - 但是当 edge_ngram tokenizer 作为 Index Analyzer 时，情况却不同，我们的目的是在将文本切分成不完整的 token 并且索引，这样在搜索的时候，当用户输入单词字符，例如：Quick Fo，不完整的单词字符 Fo 也能作为查询条件，返回相关的结果；

- **举例**:how to set up a field for search-as-you-type
  - Index Analyzer 的 max_gram 设置为10，最大可被索引的 token 是10个字符，超过10个字符的搜索关键词不会又匹配结果返回；

### 4. Keyword tokenizer

- **keyword** tokenzier，将整个文本作为一个唯一的 token；
- **可选参数：**

| **参数**    | **参数说明**                                                 |
| ----------- | ------------------------------------------------------------ |
| buffer_size | 一次性读取字符到 term buffer 中的大小，默认255。当 term buffer 不够时，会自动再增长255大小，直至读完文本。建议不要更改此设置； |

- **举例：**

### 5. Letter tokenizer

- **letter** tokenizer，遇见非单词字符的时候，就将文本进行拆分；
  - 对欧美语系来说，它做的很合理，但是对亚洲语系来说却不友好，因为在亚洲，单词之间经常没有空格；
- 没有可选参数；
- **举例**：

### 6. Lowercase tokenizer

- lowercase tokenizer，和 letter tokenizer 一样，每当遇到不是字母的字符时，都会将文本分解为 Term，但它也会将所有 Term 都小写化。
- 它在功能上等同于 letter tokenizer 和 lowercase token filter，但由于在一次传递中执行两个步骤，因此效率更高。
- **没有可选参数；**
- **举例：**

### 7. N-gram tokenzier

- **ngram** tokenizer，遇见指定字符集合中的字符时就将文本进行拆分，然后对每个切分后的单词进行 N-grams 处理；
- N-grams 就像一个滑动窗口，它在单词上移动，就像一个指定长度的连续字符序列。它们对于查询不使用空格或具有长复合词（如德语）的语言非常有用。
  - 文本："Quick Fox"；
  - 处理结果：[ Q, Qu, u, ui, i, ic, c, ck, k, "k ", " ", " F", F, Fo, o, ox, x ]
- **可选参数：**

| **参数**           | **参数说明**                                                 |
| ------------------ | ------------------------------------------------------------ |
| min_gram           | gram分词后允许的最小长度，默认值1                            |
| max_gram           | gram分词后允许的最大长度，默认值2                            |
| token_chars        | ES将会以不在字符类型所属的字符为分割符，默认值：[]，保持文本内容不变；例如，digit，会以非数字的字符作为分割符切分文本，token 中一定包含 digit；支持：<br/>letter —  for example a, b, ï or 京<br/>digit —  for example 3 or 7<br/>whitespace —  for example " " or "\n"<br/>punctuation — for example ! or "<br/>symbol —  for example $ <br/>custom —  custom characters which need to be set using the custom_token_chars setting. |
| custom_token_chars | **尚不明白用法**                                             |

> - 通常建议将 min-gram 和 max_gram 设置成相同的值；
> - 长度越小，匹配的文档越多，但匹配的质量越低。长度越长，匹配越具体。
> - 长度可以先从3开始设置，然后进行测试调整，tri-gram (长度3) 是一个很好的开始；
> - Index Settings 中可通过设置 index.max_gram_diff 来控制 max_gram 与 min_gram 之间允许的最大值；

- 举例：
  - 将字母和数字以外的字符作为分割符，并且做 tri-grams 处理，token中不满足 min_grams 的将被丢弃；

### 8. Path hierarchy tokenizer

- **path_hierarchy** tokenizer，接收一个类似文件系统路径的层次结构值，通过路径分割符拆分，将树结构中每个层级作为一个 term 输出；
  - 文本："/one/two/three"；
  - 处理结果：[ /one, /one/two, /one/two/three ]；
  - 最终输出的 token 一定是树状结构中的某一个部分值；

- **可选参数：**

| **参数**    | **参数说明**                                                 |
| ----------- | ------------------------------------------------------------ |
| delimiter   | 路径分割符，默认 "/"                                         |
| replacement | 用于 delimiter 的可选替换字符。默认为 delimiter              |
| buffer_size | 一次传递中读入 term buffer 的字符数，默认1024，term buffer 将按此大小增长，直到所有文本都被读完。建议不要更改此设置 |
| reverse     | 如果设置为 true，则以相反的顺序输出 token，默认为false（注意参考举例：正常层级数的[123]，reverse后[321]） |
| skip        | 要跳过的初始 token，默认为0。                                |

- **举例：**
  - 分割符使用 "-"，且最后 term 中用 "/" 替换 "-"，且前两个初始 token 丢弃不要；
  - 对 file_path 路径字段在索引时，使用两个自定义的 path_hierarchy tokenizer，path token 生成分别是 forward 和 reverse；
  - path_hierarchy tokenizer，forward 和 reverse 效果比较：

### 9. Pattern tokenizer

- **pattern** tokenizer，使用正则表达式在匹配到分割符时拆分文本，或者将匹配到的文本捕获为 terms；
- 默认的匹配表达式是 \W+，遇到非单词时拆分文本；
- pattern tokenizer 使用 Java 正则表达式；
- 写得不好的正则表达式可能运行的非常慢，甚至会抛出 StackOverflowError 并导致运行它的节点崩溃；
- **可选参数：**

| **参数** | **参数说明**                                                 |
| -------- | ------------------------------------------------------------ |
| pattern  | Java正则表达式，默认 \W+                                     |
| flags    | Java正则中的 flags，可以多个值，但是要用管道符 "\|" 来分隔   |
| group    | 哪个 group 去抽取数据。 默认是 to -1 (用pattern作为分割符去split). |

- **flags 参数的取值说明：**

| **编译标志**                  | **效果**                                                     |
| ----------------------------- | ------------------------------------------------------------ |
| Pattern.CANON_EQ              | 当且仅当两个字符的"正规分解(canonical decomposition)"都完全相同的情况下，才认定匹配。比如用了这个标志之后，表达式"a/u030A"会匹配"?"。默认情况下，不考虑"规范相等性(canonical equivalence)"。 |
| Pattern.CASE_INSENSITIVE (?i) | 默认情况下，大小写不明感的匹配只适用于US-ASCII字符集。这个标志能让表达式忽略大小写进行匹配。要想对Unicode字符进行大小不明感的匹配，只要将UNICODE_CASE与这个标志合起来就行了。 |
| Pattern.COMMENTS (?x)         | 在这种模式下，匹配时会忽略(正则表达式里的)空格字符(注：不是指表达式里的"//s"，而是指表达式里的空格，tab，回车之类)。注释从#开始，一直到这行结束。可以通过嵌入式的标志来启用Unix行模式。 |
| Pattern.DOTALL (?s)           | 在这种模式下，表达式'.'可以匹配任意字符，包括表示一行的结束符。默认情况下，表达式'.'不匹配行的结束符。 |
| Pattern.MULTILINE (?m)        | 在这种模式下，'^'和'\$'分别匹配一行的开始和结束。此外，'^'仍然匹配字符串的开始，'\$'也匹配字符串的结束。默认情况下，这两个表达式仅仅匹配字符串的开始和结束。 |
| Pattern.UNICODE_CASE (?u)     | 在这个模式下，如果你还启用了CASE_INSENSITIVE标志，那么它会对Unicode字符进行大小写不明感的匹配。默认情况下，大小写不明感的匹配只适用于US-ASCII字符集。 |
| Pattern.UNIX_LINES (?d)       | 在这个模式下，只有'/n'才被认作一行的中止，并且与'.'，'^'，以及'$'进行匹配。 |

- **group 捕获组参数说明：**
  - 普通捕获组（Expression）：从正则表达式左侧开始，每出现一个左括号"("记做一个分组，分组编号从 1 开始。0 代表整个表达式。例如：对于时间字符串：2017-04-25，表达式如下 (\\d{4})-((\\d{2})-(\\d{2}))
    - group(0)，捕获组 (\d{4})-((\d{2})-(\d{2}))，匹配 2017-04-25；
    - group(1)，捕获组 (\d{4})，匹配 2017；
    - group(2)，捕获组 ((\d{2})-(\d{2}))，匹配 04-25；
    - group(3)，捕获组 (\d{2})，匹配 04；
    - group(4)，捕获组 (\d{2})，匹配 25；
  - 命名捕获组（?Expression）：每个以左括号开始的捕获组，都紧跟着 ?，而后才是正则表达式。例如：对于时间字符串：2017-04-25，表达式如下 `(?<\year>\\d{4})-(?<\md>(?<\month>\\d{2})-(?<\date>\\d{2}))`
    - group(0)，捕获组 (\d{4})-((\d{2})-(\d{2}))，匹配 2017-04-25；
    - group("year")，捕获组 (\d{4})，匹配 2017；
    - group("md")，捕获组 ((\d{2})-(\d{2}))，匹配 04-25；
    - group("month")，捕获组 (\d{2})，匹配 04；
    - group("date")，捕获组 (\d{2})，匹配 25；
    - 命名的捕获组同样也可以使用编号获取相应值。
  - 非捕获组（?:Expression）：在左括号后紧跟 ?:，而后再加上正则表达式。例如：对于时间字符串：2017-04-25，表达式如下 (?:\\d{4})-((\\d{2})-(\\d{2}))
    - group(0)，捕获组 (\d{4})-((\d{2})-(\d{2}))，匹配 2017-04-25；
    - group(1)，捕获组 ((\d{2})-(\d{2}))，匹配 04-25；
    - group(2)，捕获组 (\d{2})，匹配 04；
    - group(3)，捕获组 (\d{2})，匹配 25；
    - 这个正则表达式虽然有四个左括号，理论上有 4 个捕获组。但是第一组 (?:\d{4})，其实是被忽略的。当使用 matcher.group(4) 时，系统会报错 IndexOutOfBoundsException。



- **举例：**
  - 正则表达式：通过 pattern 去捕获双引号内的文本，但是忽略文本中的引号，仅仅将它当作一个引号字符；
  - 注意：在 JSON 中写 pattern 正则表达式，" 和 \ 字符都需要转义；

### 10. Simple pattern tokenizer

- **simple_pattern** tokenizer，使用正则表达式来捕获匹配的文本作为 terms。它支持的正则表达式比 pattern tokenizer 更有限，但是 simple_pattern 通常更快；
- simple_pattern 的 pattern 的只能用来捕获文本生成 terms，不能像 pattern tokenizer 支持用 pattern 作为分割符去分割文本；
- 使用 Lucene 正则表达式；
- 默认 pattern 是空字符串，它不生成任何 terms。所以 simple_pattern 应该使用非默认 pattern；
- **可选参数：**

| **参数** | **参数说明**                   |
| -------- | ------------------------------ |
| pattern  | Lucene正则表达式，默认空字符串 |

- **举例：**

### 11. Simple pattern split tokenizer

- **simple_pattern_split** tokenizer，使用正则表达式将匹配到的内容作为分割符对文本进行拆分；
  - 比 pattern tokenizer 支持的正则更有限，但是更快；
- 使用 Lucene 正则表达式；
- 默认 pattern 是空字符串，它将整个文本作为 term，使用的时候不要使用默认pattern；
- **可选参数：**

| **参数** | **参数说明**                   |
| -------- | ------------------------------ |
| pattern  | Lucene正则表达式，默认空字符串 |

- **举例：**

### 12. Standard tokenizer

- **standard** tokenizer，提供了基于语法的拆分文本（基于Unicode文本分割算法），并且适用于大多数语言。
- **可选参数：**

| **参数**         | **参数说明**                                                 |
| ---------------- | ------------------------------------------------------------ |
| max_token_length | token允许的最大长度，如果超过了就按照max_token_length拆分它，默认255 |

- 举例：

### 13. Thai tokenizer

- **thai** tokenizer，用 Java 附带的泰语分段算法将泰语文本分割成单词。一般来说，其他语言中的文本处理将与 standard tokenizer 相同。
- 注意：并非所有的 JRE 都支持它，但是可以与 Sun/Oracle 和 OpenJDK 一起工作；
- 如果想要程序应用可完全移植，可以使用 ICU tokenizer（不是内置的）；
- 没有可选参数；

### 14. UAX URL email tokenzier

- **uax_url_email** tokenizer，与 standard tokenizer 类似，只是它将 url 和电子邮件地址识别为单个 token。
- **可选参数：**

| **参数**         | **参数说明**                                                 |
| ---------------- | ------------------------------------------------------------ |
| max_token_length | token允许的最大长度，如果超过了就按照max_token_length拆分它，默认255 |

- **举例：**

### 15. Whitespace tokenizer

- whitespace tokenizer，遇到空格时对文本进行拆分；
- **可选参数：**

| **参数**         | **参数说明**                                                 |
| ---------------- | ------------------------------------------------------------ |
| max_token_length | token允许的最大长度，如果超过了就按照max_token_length拆分它，默认255 |

- **举例：**





<br>

<br>

## 内置 Token filter 详解

Tokenzier Filter 可以从 Tokenizer 接收 token stream，并且可以修改 token（如小写化），删除 token（如去除stopwords），添加 token（如同义词）；

### 1. Apostrophe token filter

- **apostrophe** 可以将撇号后面的内容全部去掉，包括撇号本身；

```json
GET /_analyze
{
  "tokenizer" : "standard",
  "filter" : ["apostrophe"],
  "text" : "Istanbul'a veya Istanbul'dan"
}
#token stream：[Istanbul'a, veya, Istanbul'dan]
#结果：[ Istanbul, veya, Istanbul ]

#自定义 Analyzer
PUT /apostrophe_example
{
    "settings" : {
        "analysis" : {
            "analyzer" : {
                "standard_apostrophe" : {
                    "tokenizer" : "standard",
                    "filter" : ["apostrophe"]
                }
            }
        }
    }
}
```

### 2. ASCII folding token filter

- **asciifolding**，将不在 Basic Latin Unicode（前127个 ASCII 字符）中的字母、数字和符号字符转换为其等效的ASCII（如果存在）。例如，过滤器将 à 更改为 a。
- **可选参数：**

| **参数**          | **参数说明**                                                 |
| ----------------- | ------------------------------------------------------------ |
| preserve_original | （可选，布尔值）如果为true，则同时发出原始token和处理后的token。默认为false。 |

```json
PUT /asciifold_example
{
    "settings" : {
        "analysis" : {
            "analyzer" : {
                "standard_asciifolding" : {
                    "tokenizer" : "standard",
                    "filter" : ["my_ascii_folding"]
                }
            },
            "filter" : {
                "my_ascii_folding" : {
                    "type" : "asciifolding",
                    "preserve_original" : true
                }
            }
        }
    }
}
#测试
GET asciifold_example/_analyze
{
  "analyzer": "standard_asciifolding",
  "text" : "açaí à la carte"
}
#结果：[ acai, açaí, a, à, la, carte ]
```

### 3. CJK bigram token filter

- **cjk_bigram**，适用于 CJK（中文、日语和韩语）token，在内置的 CJK analyzer 中被使用；
- **可选参数：**

| **参数**        | **参数说明**                                                 |
| --------------- | ------------------------------------------------------------ |
| ignored_scripts | （可选，字符数组）要禁用bigram的字符串数组。可能值：han（汉）hangul（朝鲜文）hiragana（平假名）katakana（片假名）所有非CJK的字符单词都不做修改处理； |
| output_unigrams | （可选，boolean）如果为true，则以bigram和unigram形式发出token。如果为false，则当没有相邻字符时，将以unigram形式输出CJK字符。默认为false。 |





<style scoped>
  h3 {
      text-decoration: underline;
  }
  h4{
    	color: #00578a;
  }
</style>

