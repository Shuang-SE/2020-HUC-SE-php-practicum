// 计算所有(选中)项目的总金额;
export function calculateSumPrice(num) {
    let sumPriceNum = $("#sumPrice").find(".priceNum");
    let sumPrice = 0.00;
    for(let i = 0; i < num; i++) {
        let totalPriceNum = $(`#totalPrice${i}`).find(".priceNum");
        let itemCheck = $(`#itemCheck${i}`);
        // 没有删除的项目 && 被选中;
        if(totalPriceNum != null && itemCheck.prop("checked") === true) {
            sumPrice += parseFloat(totalPriceNum.html());
        }
    }
    sumPriceNum.html(sumPrice.toFixed(2));
}

// 计数器加减按钮事件;
export function bindForCounterButtons(num) {
    for(let i = 0; i < num; i++) {
        let counterAdd = $(`#counterAdd${i}`);
        let counterMinus = $(`#counterMinus${i}`);
        let counter = $(`input[name="counter${i}"]`);

        counterAdd.on("click", function() {
            let value = parseInt(counter.val());
            counter.val(++value);
            if(value > 999) {
                counter.val(value = 999);
            }
            counter.change();
        });

        counterMinus.on("click", function() {
            let value = parseInt(counter.val());
            counter.val(--value);
            if(value < 1) {
                counter.val(value = 1);
            }
            counter.change();
        })
    }
}

// 计数器内容改变事件;
export function bindForCounter(num) {
    for(let i = 0; i < num; i++) {
        let counter = $(`input[name="counter${i}"]`);
        let itemCheck = $(`#itemCheck${i}`);
        let priceNum = $(`#price${i}`).find(".priceNum");
        let totalPriceNum = $(`#totalPrice${i}`).find(".priceNum");

        counter.on("change", function() {
            let value = parseInt(counter.val());
            totalPriceNum.html((parseFloat(priceNum.html()) * value).toFixed(2));
            // 如果当前项被选中, 别忘了更新所有项的总金额;
            if(itemCheck.prop("checked") === true) {
                calculateSumPrice(num);
            }
        })
    }
}

// 项目删除事件;
export function bindForDeleteButton(num, currentItemNum, totalChecked) {
    for(let i = 0; i < num; i++) {
        let deleteCartItem = $(`#deleteCartItem${i}`);
        deleteCartItem.on("click", function() {
            if($(`#itemCheck${i}`).prop("checked") === true) {
                totalChecked--;
                let selectedCounterNum = $("#selectedCounter").find(".selectedCounterNum");
                selectedCounterNum.html(parseInt(selectedCounterNum.html()) - 1);
            }
            $(`#item${i}`).remove();
            currentItemNum--;
            calculateSumPrice(num);
            // TO DO: 从数据库异步删除订单;
        });
    }
}

// 购物车项目选中事件;
export function bindForItemCheck(num, currentItemNum, totalChecked) {
    for(let i = 0; i < num; i++) {
        let itemCheck = $(`#itemCheck${i}`);
        let totalPriceNum = $(`#totalPrice${i}`).find(".priceNum");

        itemCheck.on("change", "", {totalChecked: totalChecked}, function() {
            let sumPriceNum = $("#sumPrice").find(".priceNum");
            let originalNum = parseFloat(sumPriceNum.html());
            let increment = parseFloat(totalPriceNum.html());
            let selectedCounter = $("#selectedCounter").find(".selectedCounterNum");
            let selectedCounterNum = parseInt(selectedCounter.html());

            if(itemCheck.prop("checked") === true) {
                sumPriceNum.html((originalNum + increment).toFixed(2));
                selectedCounter.html(selectedCounterNum + 1);
                // 表示已全部选上;
                if(++totalChecked === currentItemNum) {
                    $("#checkAll").prop("checked", true);
                }
            }
            else {
                sumPriceNum.html((originalNum - increment).toFixed(2));
                selectedCounter.html(selectedCounterNum - 1);
                totalChecked--;
                $("#checkAll").prop("checked", false);
            }
        });
    }
}

// 购物车全选事件;
export function bindForCheckAllButton(num) {
    let checkAllButton = $("#checkAll");
    checkAllButton.on("change", function() {
        if(checkAllButton.prop("checked") === true) {
            for(let i = 0; i < num; i++) {
                let itemCheck = $(`#itemCheck${i}`);
                if(itemCheck != null && itemCheck.prop("checked") === false) {
                    itemCheck.prop("checked", true);
                    itemCheck.change();
                }
            }
        }
        else {
            for(let i = 0; i < num; i++) {
                let itemCheck = $(`#itemCheck${i}`);
                if(itemCheck != null) {
                    itemCheck.prop("checked", false);
                    itemCheck.change();
                }
            }
        }
    });
}

// 删除选中事件;
export function bindForDeleteSelectedButton(num) {
    let deleteSelected = $("#deleteSelected");
    deleteSelected.on("click", function() {
        for(let i = 0; i < num; i++) {
            let itemCheck = $(`#itemCheck${i}`);
            let deleteCartItem = $(`#deleteCartItem${i}`);
            // 没有删除的项目 && 被选中;
            if(deleteCartItem != null && itemCheck.prop("checked") === true) {
                deleteCartItem.click();
            }
        }
    })
}
