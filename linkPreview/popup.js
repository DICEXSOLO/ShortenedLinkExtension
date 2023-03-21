// Check if the extension has the necessary permissions
chrome.permissions.contains({ permissions: ['tabs'] }, function (result) {
  if (result) {
    // If the extension already has the necessary permissions, execute the code to retrieve the shortened URLs
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];

      // Get all links on the page
      chrome.tabs.executeScript(tab.id, { code: "Array.from(document.getElementsByTagName('a')).map(a => a.href);" }, function (result) {
        var urls = result[0];
        var shortenedUrls = [];

        // Filter out links that aren't shortened URLs
        var shortenedLinkPatterns = [
          /^https?:\/\/(bit\.ly|ow\.ly|t\.co|tinyurl\.com)\//i,
          /^https?:\/\/(is\.gd|goo\.gl|fb\.me|j\.mp)\//i
        ];

        urls.forEach(function (url) {
          for (var i = 0; i < shortenedLinkPatterns.length; i++) {
            if (shortenedLinkPatterns[i].test(url)) {
              shortenedUrls.push(url);
              break;
            }
          }
        });

        // Display the shortened URLs in the popup
        if (shortenedUrls.length > 0) {
          var list = document.createElement('ul');
          shortenedUrls.forEach(function (url) {
            var listItem = document.createElement('li');
            var link = document.createElement('a');
            link.href = url;
            link.textContent = url;
            link.target = '_blank';
            listItem.appendChild(link);
            list.appendChild(listItem);
          });
          document.getElementById('urls').appendChild(list);
        } else {
          document.getElementById('urls').textContent = 'No shortened links found.';
        }
      });
    });
  } else {
    // If the extension does not have the necessary permissions, prompt the user to grant them
    chrome.permissions.request({ permissions: ['tabs'] }, function (granted) {
      if (granted) {
        // If the user grants the permissions, execute the code to retrieve the shortened URLs
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          var tab = tabs[0];

          // Get all links on the page
          chrome.tabs.executeScript(tab.id, { code: "Array.from(document.getElementsByTagName('a')).map(a => a.href);" }, function (result) {
            var urls = result[0];
            var shortenedUrls = [];

            // Filter out links that aren't shortened URLs
            var shortenedLinkPatterns = [
              /^https?:\/\/(bit\.ly|ow\.ly|t\.co|tinyurl\.com)\//i,
              /^https?:\/\/(is\.gd|goo\.gl|fb\.me|j\.mp)\//i
            ];

            urls.forEach(function (url) {
              for (var i = 0; i < shortenedLinkPatterns.length; i++) {
                if (shortenedLinkPatterns[i].test(url)) {
                  shortenedUrls.push(url);
                  break;
                }
              }
            });

            // Display the shortened URLs in the popup
            if (shortenedUrls.length > 0) {
              var list = document.createElement('ul');
              shortenedUrls.forEach(function (url) {
                var listItem = document.createElement('li');
                var link = document.createElement('a');
                link.href = url;
                link.textContent = url;
                link.target = '_blank';
                listItem.appendChild(link);

