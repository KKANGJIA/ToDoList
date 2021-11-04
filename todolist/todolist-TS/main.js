"use strict"
const input = document.querySelector('.input');
const items = document.querySelector('.items');
const addBtn = document.querySelector('#addBtn');

//리스트를 추가하는 함수
function onAdd() {
    //1. 사용자 입력 값 받아오기
    const text = input.value;
    if (text === "") {
        input.focus();
        return; 
    }

    //2. 새로운 아이템을 만들어서 추가하기
    const item = createItem(text);

    items.appendChild(item);

    //4. 맨 아래로 스크롤을 내릴 수 있도록
    item.scrollIntoView({ block: "center" });

    //3. 내역 추가 후에 입력 칸 초기화하고 포커스 맞추기
    input.value = '';
    input.focus();

}

let id = 0;
function createItem(text) { //아이템을 만들어주는 함수
    //방법1: DOM 요소 생성하기
    const li = document.createElement('li');
    li.setAttribute('class', 'item_row');
    li.setAttribute("data-id", id); 
    
    li.innerHTML = `
        <div class="item">
            <p class="item-name">${text}</p>
            <button>
                <i data-id=${id} class="fas fa-trash-alt"></i>
            </button>
        </div>
        <div class="item__divider"></div>
    `;
    id++;
    return li;


    // const p = document.createElement('p');
    // p.setAttribute('class', 'item-name');
    // var item = document.createTextNode(`${text}`);
    // p.appendChild(item);
    // li.appendChild(p);

    // //삭제 버튼 구현하기
    // const deleteBtn = document.createElement('button');
    // deleteBtn.setAttribute('class', 'item-delete');
    // deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // deleteBtn.addEventListener('click', () => {
    //     items.removeChild(li);
    // })
    // li.appendChild(deleteBtn);

    // //console.log(items); //items안에 태그가 다 들어와있는지 확인 완료!
}

addBtn.addEventListener('click', () => { //버튼이 선택되면
    // 내역을 추가하는 함수 실행
    onAdd();

    //스크롤이 될 때 가장 아래의 내용이 보이도록 하기
})

window.addEventListener('keypress', () => {
    if (window.event.keyCode == 13) { 
        // 엔터키가 눌렸을 때 
        onAdd();
    } 
});

items.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    if (id) {
      const toBeDeleted = document.querySelector(`.item_row[data-id="${id}"]`); 
      //태그가 생각이 안나면 개발자 도구 resource에서 target확인 가능
      toBeDeleted.remove();
    }
  });

/*
자바스크립트 짤 때 유의할 점
1. 가장 상단에 "use strict"를 작성한다.
2. 필요한 모든 기능을 작성한다.
3. function과 addEventListener를 만든 다음에 위의 기능을 각각 분배한다.
4. 그리고 각 기능의 틀을 잡는다(다른 function을 만들어야 하는지를 보기위함)
5. 기능 정리가 다 된 후에 각 함수마다 코드를 작성한다!!!
6. 본 함수를 작성하는 동안 필요한 DOM요소 접근은 상단에서 한다.
(전역변수로 사용하기 위함 이때, var는 사용하지 않는다. const와 let을 사용하자.)
7. 주석은 왜 함수를 사용했는지 무엇을 의미하는 건지만 적어주기(현업꿀팁)
*/