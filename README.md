# 자바스크립트 밴딩머신 기능 구현

## 🔥 구현 목표 🔥

1. 소지금 내에서 입금하기
2. 입금한 돈으로 아이템 구매하기
3. 구매하고 남은 돈 거슬러받기
4. 선택, 획득한 아이템 목록 표시하기
5. 재고에 따라 메뉴버튼 사용 가능 여부 변경하기
6. 한번으로 끝나지 않는 프로그램 만들기
7. 최초 소지금, 상품 추가, 재고 관리 쉽게 하기
8. 여러 상황에 따라 유효성 확인 및 안내 띄우기

    - 입금할 금액보다 소지금이 부족할 때
    - 입금액이 상품 총액보다 부족할 때
    - 1000원 단위 입금이 아닐 때
    - 구매하려는 아이템이 재고가 없을 때
    - 거스름돈 안내, 아이템 선택 중에 거스름돈을 받으려고 할 때

---

## 🔥 기능 🔥

-   상품 목록 생성
-   소지금 계산, 표시
-   입금, 잔액 표시
-   거스름돈 계산, 표시
-   선택 아이템 목록 추가, 개수 누적, 선택 삭제
-   획득시 획득 목록 추가, 개수 누적
-   획득시 총 금액 계산, 표시

---

## 🔥 알아보기 🔥

-   `console.log()` 로 내가 원하는 정보 확인하기
-   `let`, `const`
-   `for` 와 `foreach`
-   `if`
-   `document`
    -   .querySelector(), .querySelectorAll()
        -   id, class, selector
    -   .getElementById()
        -   id
    -   .getElementsByTagName()
        -   element
-   `Map`
-   `function` 으로 원하는 기능 구현하기
    -   작은 기능부터 구현하기
    -   매개변수 써먹기