---
layout: post
title: 使用python asyncio那一套，写一个冬日绘板客户端
subtitle: fuck
tags: 杂项
---

最快的冬日绘板客户端，它只差一车代理（

讲道理，这个确实需要一个系统的讲解。

异步就是开一个 事件循环，然后有一个操作叫挂起，异步处理若干个异步函数(或者叫 协程)的计算，如果一个函数挂起了，那么会去队列里找到下一个来执行，这样可以几乎总是做着有效计算，除非没有计算任务了。

异步的调度速度比起线程调度器要更快，这是显然的。

python标准库提供asyncio来写异步。

-----

asyncio高层api

最基本的东西是，异步函数和Task。异步函数是使用async修饰的函数，Task是使用asyncio.create_task(fun(args))之类的东西创建的。

异步函数和Task的区别在于，调用异步函数使用await fun()，而调用Task指向的异步函数使用await task，前者是阻塞的(也就是会阻塞等到fun完成)，而后者非阻塞(也就是在task挂起了的时候，当前函数也会挂起)。

使用asyncio.wait和asyncio.gather也可以也可以创建Task。它们的参数都是一个异步函数的列表，gather返回这些异步函数返回值的列表，而wait返回两个Task列表，表示已经执行完的和没有执行完的。为什么还有没有执行完的?因为wait接收另一些参数，表示它最长的等待时间，以及是在第一个执行完后返回，还是在所有的都执行完之后返回，还是在抛出异常之后立即返回。可以使用Task.result()获取它的返回值。

使用Task.done()可以检查一个Task是否已经计算完，Task.cancel()可以取消它的计算，这会抛出CancelledError，毕竟你的计算算到一半就没了。

使用asyncio.sleep()可以仅挂起当前的计算，而不影响别的计算，使用time.sleep()则会挂起整个程序。

现在你已经可以写简单的异步程序了。

-----

aiohttp

如果说异步有啥用，那一般都是在延迟上天的网络当中。

aiohttp提供了http方法。

在冬日绘板中我们只需要用ClientSession.get()和ClientSession.post()。为了使用这两个方法，首先创建一个ClientSession，然后就开始用就行了。好像建议使用async with asyncio.ClientSession() as sess:这样的写法。

那么怎么开始用呢?写async with sess.get()/post() as r:就行了。

在get中，使用await r.text()获取内容。在post中是await r.data()。获取别的信息是一样的。

为了同时进行多个post，可以为它们创建一些task，然后用gather执行。

-----

异步可以用在多线程的每个线程中，但是那太麻烦了，并且在冬日绘板中，瓶颈完全在网络，而我们已经可以以吓人的速度完成若干个post。

-----

所以要怎么写一个脚本?

首先我们需要处理出想画的样子。这完全不需要效率，并且可以随手写出来。

我们每30s执行一次，遍历所有token和整个绘板尝试画不满足要求的位置。先为每个post创建一个Task，然后使用wait执行。
