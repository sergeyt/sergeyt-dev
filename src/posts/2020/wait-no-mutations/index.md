---
title: How to wait for animations to complete in Playwright script
date: '2020-09-15'
spoiler: You can use MutationObserver to do that
tags: ["playwright", "e2e", "testing", "sample"]
reddit: "https://www.reddit.com/r/QualityAssurance/comments/it4qn5/how_to_wait_animations_complete_in_playwright"
---

In this post I am going to show a function to wait for animations to complete in [Playwright](https://playwright.dev) test script.
As usual enough words, just try to apply the code below :smile:

```js
async function waitNoMutations(page, selector) {
  return await page.evaluateHandle(function (selector) {
    var list = document.querySelectorAll(selector);
    var elements = [].slice.call(list);
    var config = { attributes: true, childList: true, subtree: true };
    var mutations = 5; // wait at least five intervals

    var observer = new MutationObserver(function () {
      mutations += 1;
    });
    elements.forEach(function (target) {
      observer.observe(target, config);
    });

    var decrementInterval = setInterval(function () {
      mutations -= 1;
      if (mutations <= 0) {
        clearInterval(decrementInterval);
      }
    }, 5); // this quant might be reduced?

    function complete() {
      return mutations <= 0;
    }

    return new Promise(function (resolve) {
      var count = 0;
      var completeInterval = setInterval(function () {
        if (count >= 1000) { // timeout?
          clearInterval(completeInterval);
          observer.disconnect();
          resolve("timeout");
          return;
        }
        if (complete()) {
          clearInterval(completeInterval);
          observer.disconnect();
          resolve(true);
          return;
        }
        count += 1;
      }, 5);
    });
  }, selector);
}
```

This works, but not in 100% cases :smile:

Enjoy! EOF :smile:
