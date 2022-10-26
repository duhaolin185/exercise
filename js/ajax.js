function ajax(obj) {
  const url = obj.url;
  const method = obj.method;
  const async = obj.async;
  const data = obj.data;
  const xhr = new XMLHttpRequest();
  if (method === "get" || method === "GET") {
    let str = "";
    for (let [key, val] of Object.entries(data)) {
      str += key + "=" + val + "&";
    }
    const time = new Date()
    str += "timer=" + time.getTime();
    xhr.open(method, url + "?" + str, async);
    xhr.send();
  } else {
    xhr.open(method, url, async);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }

  if (async) {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status.toString().startsWith("2")) {
          console.log(xhr)
          obj.fn(xhr.responseText);
        }
      }
    }
  } else {
    if (xhr.status.toString().startsWith("2")) {
      obj.fn(xhr.responseText);
    }
  }

}