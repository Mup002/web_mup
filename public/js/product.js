

////----------------///////////

var cart  = JSON.parse(localStorage.getItem("cart"));
if(cart != null){
  giohang = cart;
}else{
  var giohang = [];
}


var btnAdds = document.querySelectorAll(".btn-add");

for(let i = 0; i < btnAdds.length; i++) {
  btnAdds[i].addEventListener("click", function() {
    var hinh = this.parentElement.parentElement.querySelector("img").src;
    var ten = this.parentElement.parentElement.querySelector("h4").textContent;
    var gia = this.parentElement.querySelector("#price").textContent;
    var soluong = 1;
    var check = 0;
    for(let j = 0;j < giohang.length;j++){
      if(giohang[j]["ten"] == ten){
        giohang[j]["soluong"]  += soluong ;
        check = 1;
        break;
      }
    }
   if(check == 0){
    var sp = {
      "hinh":hinh,
      "ten":ten,
      "gia":gia,
      "soluong":soluong
    }
    giohang.push(sp);
   }

    // day gio hang len local
    localStorage.setItem("cart",JSON.stringify(giohang));
    // lay ve
    var cart  = JSON.parse(localStorage.getItem("cart"));
   
  });
}

function loadcart(){
  var cart  = JSON.parse(localStorage.getItem("cart"));
  if(cart != null){
    document.getElementById("slsp").innerHTML = cart.length
  }
}

//-//
function loaddatacart(){
  loadcart();
  showcart();
  total();
}
function showcart(){
  var cart = JSON.parse(localStorage.getItem("cart"));
  if(cart != null){
    var kq= "";
    for(let i = 0;i<cart.length;i++){
      var tt = parseInt( cart[i]["gia"] *  cart[i]["soluong"])
      kq += ` 
    <tr>
      <td><img src = "`+cart[i]["hinh"]+`" height = "300px" width = "auto">
      `+cart[i]["ten"]+`
      </td>
      <td class= "last-td"> `+cart[i]["gia"]+`</td>
      <td class= "last-td last-td-btn"><button class = "bot btn-table" onclick = "tang(this,`+i+`)">+</button><span> `+cart[i]["soluong"]+`</span><button class = "them btn-table" onclick = "giam(this,`+i+`)">-</button></td>
      <td class = "last-td"> ` +tt+ `</td>
      <td class = "last-td"><button class = "btn-del">Xoa</button></td>
    </tr>
      `;
    }
    document.getElementById("info_cart").innerHTML = kq;
  }
}
function tang(x,i){
  var td = x.parentElement; 
  var sl = parseInt(td.childNodes[1].textContent);
  var slmoi = sl + 1;
  td.childNodes[1].innerHTML = slmoi;
  giohang[i]["soluong"] = slmoi;
  total();
}
function giam(x,i){
  var td = x.parentElement; 
  var sl = parseInt(td.childNodes[1].textContent);
  var slmoi = sl - 1;
  td.childNodes[1].innerHTML = slmoi;
  giohang[i]["soluong"] = slmoi;
  total();
}
function total(){
  var cart = giohang;
  if(cart != null){
    var total = 0;
    var kq= "";
    for(let i = 0;i<cart.length;i++){
      var tt = parseInt( cart[i]["gia"] *  cart[i]["soluong"])
      total += tt;
    }
    document.getElementById("tongdonhang").innerHTML = "Tổng đơn hàng : " + total+ " đồng";
  }
}
function delcart(){
  localStorage.removeItem("cart");
  window.location.reload();
}
// lấy danh sách các button "Xóa"
var btnDelList = document.querySelectorAll('.btn-del');

// thêm sự kiện "click" cho từng button "Xóa"

for(let i = 0; i < btnDelList.length; i++) {
  btnDelList[i].addEventListener("click",()=>{
    var trElement = btnDelList[i].parentNode.parentNode; // truy cập tới thẻ cha (<tr>) của button "Xóa"
    trElement.remove(); // xóa phần tử đó đi
  })
}

