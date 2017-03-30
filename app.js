class App {
  init() {
    document.querySelector('#dialog-button')
      .addEventListener(
        'click',
        this.openCreateDialog, false);
  }

  async openCreateDialog() {
    let dialog = new AddTodoDialog();
    let text = await dialog.open();
    let el = document.createElement('li');
    let span = document.createElement('span');
    let txt = document.createTextNode('\u00D7');
    el.innerHTML = text;
    span.className = "delete";
    span.appendChild(txt);
    el.appendChild(span);
    document.querySelector('#todos').appendChild(el);

    let close = document.querySelectorAll('.delete');
    for (let i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let li = this.parentElement;
        li.remove();
      }
    }
  }
}

class AddTodoDialog {
  constructor() {
    this.container = document.body;
    this.template = `
      <div class="dialog">
        <div><input type="text" name="todo" id="todo"/></div>
        <div class="buttons">
          <button id="cancel">Cancel</button>
          <button id="save">Save</button>
        </div>
      </div>
`;
  }

  open() {
    return new Promise((resolve, reject) => {
      let el = document.createElement('div');
      el.classList.add('dialog-container');
      el.innerHTML = this.template;
      el.querySelector("#todo").focus();

      el.querySelector('#cancel').addEventListener('click', () => {
        reject({
          'cancel': true
        });
        this.container.removeChild(el);
      });

      el.querySelector('#save').addEventListener('click', () => {
        if (el.querySelector('input').value !== "") {
          resolve(el.querySelector('input').value);
          this.container.removeChild(el);
        }
      });

      this.container.appendChild(el);
    });
  }
}

window.onload = () => {
  new App().init();
};