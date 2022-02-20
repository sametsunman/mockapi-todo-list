const url = "https://my-json-server.typicode.com/sametsunman/mockapi-todo-list/tasks/";

export const Get = (taskOperation) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => taskOperation("get",data));
  };

export const Post = (taskOperation, task) => {
    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => taskOperation("create",data));
  };

export const Delete = (taskOperation, id) => {
    fetch(url + id, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => response.json())
      .then((data) => taskOperation("delete",id));
  };

export const Put = (taskOperation, id, task) => {
    fetch(url + id, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => taskOperation("update",task));
  };