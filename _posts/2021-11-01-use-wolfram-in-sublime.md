---
layout: post
title: 用Sublime写Wolfram
subtitle: 牛逼
tags: 杂项
---

安装Wolfram Engine

打开Sublime，用Package Control安装WolframLanguage，然后新建编译系统，写一个

```json
{
	"encoding":"gbk",
	"shell_cmd": "wolframscript -file $file_name -print",
	"selector": "source.wl",
	"working_dir": "$file_path",
	"variants":[{"name":"Run","shell_cmd":"wolframscript -file $file_name -print"}]
}

```

就行了。谢谢朋友们!