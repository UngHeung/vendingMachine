/* ===== init ===== */
let wallet = 50000;
let slotMoney = 0;
let change = 0;
let totalPrice = 0;
let totalCount = 0;
let totalPayment = 0;

/* 아이템 이미지 불러오기용 */
const itemsCode = new Map([
    ["Original_Cola", "original"],
    ["Violet_Cola", "violet"],
    ["Yellow_Cola", "yellow"],
    ["Cool_Cola", "cool"],
    ["Green_Cola", "green"],
    ["Orange_Cola", "orange"],
]);

/* 아이템별 가격 */
const itemsPrice = new Map([
    ["Original_Cola", 1000],
    ["Violet_Cola", 1000],
    ["Yellow_Cola", 1000],
    ["Cool_Cola", 1000],
    ["Green_Cola", 1000],
    ["Orange_Cola", 1000],
]);

/* 아이템 재고 */
const itemsStock = new Map([
    ["Original_Cola", 10],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 10],
    ["Cool_Cola", 10],
    ["Green_Cola", 10],
    ["Orange_Cola", 10],
]);

/* 선택 아이템 개수 */
const itemsCount = new Map([
    ["Original_Cola", 0],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 0],
    ["Cool_Cola", 0],
    ["Green_Cola", 0],
    ["Orange_Cola", 0],
]);

/* 구매 아이템 개수 */
const selectCount = new Map([
    ["Original_Cola", 0],
    ["Violet_Cola", 0],
    ["Yellow_Cola", 0],
    ["Cool_Cola", 0],
    ["Green_Cola", 0],
    ["Orange_Cola", 0],
]);

const Original_Cola = {
    itemCode: "original",
    itemPrice: 1000,
    itemStock: 10,
    itemCount: 10,
    selectCount: 0,
};

const Violet_Cola = {
    itemCode: "violet",
    itemPrice: 1000,
    itemStock: 10,
    itemCount: 10,
    selectCount: 0,
};

const Yellow_Cola = {
    itemCode: "yellow",
    itemPrice: 1000,
    itemStock: 10,
    itemCount: 10,
    selectCount: 0,
};

const Cool_Cola = {
    itemCode: "cool",
    itemPrice: 1000,
    itemStock: 10,
    itemCount: 10,
    selectCount: 0,
};

const Green_Cola = {
    itemCode: "green",
    itemPrice: 1000,
    itemStock: 10,
    itemCount: 10,
    selectCount: 0,
};

const Orange_Cola = {
    itemCode: "orange",
    itemPrice: 1000,
    itemStock: 10,
    itemCount: 10,
    selectCount: 0,
};

/* 상품 목록 */
const itemsList = ["Original_Cola", "Violet_Cola", "Yellow_Cola", "Cool_Cola", "Green_Cola", "Orange_Cola"];

/* ===== setter ===== */
function setWallet(money) {
    wallet = money;
}

function setSlotMoney(money) {
    slotMoney = money;
}

function setChange(money) {
    change = money;
}

function setTotalPrice(price) {
    totalPrice = price;
}

function setTotalCount(count) {
    totalCount = count;
}

function setTotalPayment(price) {
    totalPayment = price;
}

function setItemStock(itemName, value) {
    itemsStock.set(itemName, value);
}

function setItemCount(itemName, value) {
    itemsCount.set(itemName, value);
}

function setSelectCount(itemName, value) {
    selectCount.set(itemName, value);
}

/* ===== getter ===== */
function getWallet() {
    return wallet;
}

function getSlotMoney() {
    return slotMoney;
}

function getChange() {
    return change;
}

function getTotalPrice() {
    return totalPrice;
}

function getTotalCount() {
    return totalCount;
}

function getTotalPayment() {
    return totalPayment;
}

function getItemCode(itemName) {
    return itemsCode.get(itemName);
}

function getItemPrice(itemName) {
    return itemsPrice.get(itemName);
}

function getItemStock(itemName) {
    return itemsStock.get(itemName);
}

function getItemCount(itemName) {
    return itemsCount.get(itemName);
}

function getSelectCount(itemName) {
    return selectCount.get(itemName);
}

/* ===== display information ===== */
const slotChangeDisplay = document.getElementById("change_display");
const totalPaymentDisplay = document.getElementById("total_payment");
const myWalletDisplay = document.getElementById("my_wallet");

const display = {
    /* "화면 표시 */

    change: () => {
        slotChangeDisplay.textContent = "";
        slotChangeDisplay.insertAdjacentText(
            "beforeend",
            `${getChange()
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        );
    },

    totalPayment: () => {
        totalPaymentDisplay.textContent = "";
        totalPaymentDisplay.insertAdjacentText(
            "beforeend",
            `${getTotalPayment()
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        );
    },

    myWallet: () => {
        myWalletDisplay.textContent = "";
        myWalletDisplay.insertAdjacentText(
            "beforeend",
            `${getWallet()
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        );
    },

    selectItemCount: (itemName) => {
        if (getItemCount(itemName) != 0) {
            const selectItemCount = document.querySelector(`.${itemName}-count`);
            selectItemCount.textContent = "";
            selectItemCount.insertAdjacentText("beforeend", `${getItemCount(itemName)}`);
        }
    },
};

display.change();
display.totalPayment();
display.myWallet();
display.totalPayment();

/* ===== calculation ===== */
const cal = {
    /* "금액 계산 기능" */

    /* 입금액 합산 */
    slotMoney: (money) => {
        setSlotMoney(getSlotMoney() + money);
    },

    /* 입금액 만큼 소지금 차감, 거스름돈 소지금 합산 */
    wallet: (type, money) => {
        if (type === "+") {
            setWallet(getWallet() + money);
        } else if (type === "-") {
            setWallet(getWallet() - money);
        }
    },

    /* 아이템 가격 총액 계산 */
    totalPrice: (type, price) => {
        if (type === "+") {
            setTotalPrice(getTotalPrice() + price);
        } else if (type === "-") {
            setTotalPrice(getTotalPrice() - price);
        }
    },

    /* 입금액에서 가격 총액을 뺀 나머지 거스름돈 계산 */
    change: () => {
        setChange(getSlotMoney() - getTotalPrice());
    },

    /* 가격 총액을 총 지불 금액에 합산 */
    totalPayment: () => {
        setTotalPayment(getTotalPayment() + getTotalPrice());
    },

    /* 구입 후 입금액을 잔액으로 변경 */
    remainSlotMoney: () => {
        setSlotMoney(getChange());
    },
};

const stock = {
    /* "재고 계산" */

    /* 선택, 재고, 구매 */
    countAndStock: (type, itemName) => {
        if (type == "add") {
            // 추가시 선택 개수 ++, 재고 --, 획득 개수 ++
            setItemCount(itemName, getItemCount(itemName) + 1);
            setItemStock(itemName, getItemStock(itemName) - 1);
        } else if (type == "delete") {
            // 삭제시 선택 개수 --, 재고 ++, 획득 개수 --
            setItemCount(itemName, getItemCount(itemName) - 1);
            setItemStock(itemName, getItemStock(itemName) + 1);
        }
    },

    /* 아이템 구매 개수 */
    selectCount: () => {
        itemsList.forEach((itemName) => {
            if (check.selectCount("count", itemName)) {
                setSelectCount(itemName, getSelectCount(itemName) + getItemCount(itemName));
            }
        });
    },
};

/* ===== validation check ===== */
const check = {
    /* "유효성 검사" */

    /* 소지금 확인 */
    wallet: () => {
        const insertMoney = parseInt(insertInput.value);

        if (getWallet() < insertMoney) {
            alert(`소지금 부족! ${wallet}원 남았습니다.`);
            return false;
        }

        return true;
    },

    /* 아이템 재고 확인 */
    stock: (type, itemName) => {
        if (getItemStock(itemName) == 0) {
            if (type != "makeList") {
                alert(`${itemName}의 재고가 부족합니다.`);
            }
            return false;
        }

        return true;
    },

    /* 입력된 값이 천원 단위인지 확인 */
    slotInsert: (money) => {
        if (money % 1000 != 0) {
            alert("1,000원 단위로만 입금 가능합니다.");
            return false;
        }

        return true;
    },

    /* 거스름돈이 있는지 확인 */
    change: () => {
        if (getChange() == 0) {
            alert("거스름돈이 없습니다.");
            return false;
        }

        alert(`${getChange()}원이 반환되었습니다.`);
        return true;
    },

    /* 선택된 물건이 있는지 확인 */
    totalCount: (type) => {
        if (type == "get") {
            // 구매할 때 선택된 물건이 있는지 확인
            if (getTotalCount() == 0) {
                alert("선택된 상품이 없습니다.");
                return false;
            }
        } else if (type == "change") {
            // 거스름돈을 반환할 때 선택된 물건이 있는지 확인
            if (getTotalCount() > 0) {
                alert("선택된 상품이 있습니다.");
                return false;
            }
        }

        return true;
    },

    /* 목록에서 추가, 삭제할 아이템 개수 확인 */
    count: (type, itemName) => {
        if (type == "add") {
            // 같은 종류의 아이템이 있는지 확인
            if (getItemCount(itemName) != 0) {
                return false;
            }
        } else if (type == "remove") {
            // 같은 종류의 아이템이 없는지 확인
            if (getItemCount(itemName) != 1) {
                return false;
            }
        }

        return true;
    },

    /* 구매 금액이 충분한지 확인 */
    payment: () => {
        if (getChange() < 0) {
            alert(`${getChange() * -1}원이 부족합니다.`);
            return false;
        }

        return true;
    },

    /* 아이템 구매 개수 확인 */
    selectCount: (type, itemName) => {
        if (type == "count") {
            // 구매시 선택된 아이템이 있는지 확인
            if (getItemCount(itemName) == 0) {
                return false;
            }
        } else if (type == "get") {
            // 같은 종류의 아이템을 구매했었는지 확인
            if (getSelectCount(itemName) != 0) {
                return false;
            }
        }

        return true;
    },
};

/* ===== reset ===== */
const reset = {
    /* 초기화 */

    /* 거스름돈 초기화 */
    change: () => {
        slotMoney = 0;
        cal.change();
    },

    /* 선택 아이템 개수 초기화 */
    itemsCount: () => {
        itemsList.forEach((item) => {
            itemsCount.set(item, 0);
        });
    },

    /* 재고 변경에 따른 메뉴 초기화 */
    itemList: () => {
        itemsList.forEach((itemName) => {
            const item = document.querySelector(`.${itemName}`);

            if (itemsStock.get(itemName) == 0) {
                // 재고가 0인 아이템은 soldout 처리
                item.setAttribute("class", `soldout ${itemName}`);
                item.setAttribute("disabled", "");
            }
        });
    },

    /* 가격 총액 초기화 */
    totalPrice: () => {
        totalPrice = 0;
    },

    /* 선택 목록 초기화 */
    selectList: () => {
        selectList.textContent = "";
    },

    /* 선택 총 개수 초기화 */
    totalCount: () => {
        totalCount = 0;
    },
};

/* ===== function ===== */
/* 메뉴 목록 생성 */
const menuList = document.querySelector(".items-list");

function makeMenuList() {
    itemsList.forEach((itemName) => {
        const item = document.createElement("li");
        const button = document.createElement("button");
        const itemCode = getItemCode(itemName);

        button.setAttribute("type", "button");
        button.setAttribute("value", `${itemName}`); // 버튼 클릭 시 가져오기 위한 value
        button.setAttribute("class", `in-stock ${itemName}`); // instock은 재고 있음, soldout은 재고 없음

        // 첫 목록 생성시 재고 없으면 instock 대신 soldout, disabled로 비활성화
        if (!check.stock("makeList", itemName)) {
            button.setAttribute("class", `soldout ${itemName}`);
            button.setAttribute("disabled", "");
        }

        button.insertAdjacentHTML("beforeend", `<img src="images/${itemCode}.png" alt="${itemName.replace("_", " ")} image" class="item-img">`);
        button.insertAdjacentHTML("beforeend", `<strong class="item-name">${itemName}</strong>`);
        button.insertAdjacentHTML("beforeend", `<span class="item-price">${getItemPrice(itemName)}원</span>`);

        item.appendChild(button);
        menuList.appendChild(item);
    });
}

makeMenuList();

/* 입금 */
const insertInput = document.getElementById("insert_input");
const insertButton = document.getElementById("insert_button");

function slotInsertButton() {
    insertButton.addEventListener("click", () => {
        const money = parseInt(insertInput.value);
        if (check.wallet()) {
            // 입금할 소지금이 남아있는지 확인
            if (check.slotInsert(money)) {
                cal.slotMoney(money); // 입금된 돈을 slotMoney에 합산
                cal.change(); // 입금된 돈에서 선택된 상품의 총액을 뺀 나머지를 계산
                cal.wallet("-", money); // 소지금 차감
                display.change(); // 잔액 표시
                display.myWallet(); // 소지금 표시
            }
        }
        insertInput.value = ""; // 입금 후 input 값 초기화
    });
}

slotInsertButton();

/* 거스름돈 반환 버튼 */
const changeButton = document.getElementById("change_button");

function slotChangeButton() {
    changeButton.addEventListener("click", () => {
        if (check.totalCount("change")) {
            if (check.change()) {
                cal.wallet("+", change); // 반환된 거스름돈 소지금에 추가
                reset.change(); // 거스름돈 초기화
                cal.change(); // 거스름돈 계산
                display.myWallet(); // 소지금 표시
                display.change(); // 잔액 표시
            }
        }
    });
}

slotChangeButton();

/* 메뉴 아이템 버튼 이벤트 추가 */
const menuItem = document.querySelectorAll(".in-stock");

function selectMenuButton() {
    menuItem.forEach((item) => {
        item.addEventListener("click", () => {
            const itemName = item.value;

            // 재고 확인
            if (check.stock("none", itemName)) {
                addSelectList(itemName); // 선택 아이템 목록 추가

                stock.countAndStock("add", itemName); // 선택 아이템 개수, 재고 계산

                cal.totalPrice("+", getItemPrice(itemName));
                cal.change(); // 거스름돈 계산
                display.change(); // 잔액 표시
                display.selectItemCount(itemName); // 같은 종류의 아이템 선택 개수 표시

                totalCount++; // 선택된 아이템 총 개수 ++
            }
        });
    });
}

selectMenuButton();

/* 선택된 아이템 목록 */
const selectList = document.querySelector(".select-list");

function addSelectList(itemName) {
    const selectItem = document.createElement("li");
    const selectButton = document.createElement("button");

    if (check.count("add", itemName)) {
        selectButton.setAttribute("type", "button");
        selectButton.setAttribute("value", `${itemName}`);

        selectButton.insertAdjacentHTML("beforeend", `<img src="images/${itemsCode.get(itemName)}.png" alt="${itemName.replace("_", " ")} image" class="select-img">`);
        selectButton.insertAdjacentHTML("beforeend", `<strong class="item-name">${itemName}</strong>`);
        selectButton.insertAdjacentHTML("beforeend", `<span class="${itemName}-count">${getItemCount(itemName) + 1}</span>`);

        selectItem.appendChild(selectButton);
        selectList.appendChild(selectItem);

        /* 목록 아이템 삭제 */
        selectButton.addEventListener("click", () => {
            if (check.count("remove", itemName)) {
                // 같은 종류의 마지막 아이템이면 목록에서 삭제
                selectList.removeChild(selectItem);
                stock.countAndStock("delete", itemName);
            } else {
                // 같은 종류의 아이템이 마지막이 아니면 개수만 감소
                stock.countAndStock("delete", itemName);
                display.selectItemCount(itemName); // 변경된 아이템 개수 표시
            }
            cal.totalPrice("-", itemsPrice.get(itemName)); // 선택 아이템 가격을 가격 총액에서 차감
            cal.change(); // 거스름돈 계산
            display.change(); // 잔액 표시

            totalCount--; // 선택된 아이템 총 개수 --
        });
    }
}

/* 구매한 아이템 목록 */
const dispenserList = document.querySelector(".dispenser-list");

function addDispenserList() {
    itemsList.forEach((itemName) => {
        // 선택된 아이템이 있는지 확인
        if (!check.count("add", itemName)) {
            // 이미 구매한 같은 종류의 아이템이 있는지 확인
            if (check.selectCount("get", itemName)) {
                const getItem = document.createElement("li");
                const getItemButton = document.createElement("button");

                getItemButton.setAttribute("type", "button");
                getItemButton.setAttribute("class", `${itemName}-get`);
                getItemButton.setAttribute("disabled", "");

                getItemButton.insertAdjacentHTML("beforeend", `<img src="images/${getItemCode(itemName)}.png" alt="${itemName.replace("_", " ")} image" class="select-img">`);
                getItemButton.insertAdjacentHTML("beforeend", `<strong class="item-name">${itemName}</strong>`);
                getItemButton.insertAdjacentHTML("beforeend", `<span class="${itemName}-count">${getItemCount(itemName)}</span>`);

                getItem.appendChild(getItemButton);
                dispenserList.appendChild(getItem);
            } else {
                const itemCount = document.querySelector(`.${itemName}-get>span`);
                itemCount.textContent = "";
                itemCount.insertAdjacentText("beforeend", `${getSelectCount(itemName) + getItemCount(itemName)}`);
            }
        }
    });
}

/* 획득 버튼 이벤트 */
const getItemsButton = document.getElementById("get_button");

function getButton() {
    getItemsButton.addEventListener("click", () => {
        if (check.payment()) {
            if (check.totalCount("get")) {
                cal.totalPayment(); // 구매 총액에 가격 총액 합산

                addDispenserList(); // 구매 목록 생성

                stock.selectCount(); // 아이템별 구매 개수 추가

                reset.itemsCount(); // 선택 아이템 개수 초기화
                cal.remainSlotMoney(); // 거스름돈을 입금액으로 변경
                reset.totalPrice(); // 가격 총액 초기화

                reset.itemList(); // 메뉴 목록 초기화
                reset.selectList(); // 선택 목록 초기화
                reset.totalCount(); // 총 선택 개수 초기화

                display.totalPayment(); // 구매 총액 표시
                display.change(); // 잔액 표시
            }
        }
    });
}

getButton();
