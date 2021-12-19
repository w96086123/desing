list=[];
title={IceCreamWaffle:['冰淇淋鬆餅',100],
        bree:['布蕾',50],
        cake:['千層蛋糕',80],
        coffee:['咖啡',50],
        dount:['甜甜圈',30],
        fruit_tower:['綜合水果塔',100],
        mike_tea:['鮮奶茶',45],
        oulei:['抹茶歐蕾',60],
        Pie:['甜點派',40],
        sparking_drink:['水果氣泡飲',50],
        sundae:['聖代',60],
        puff:['泡芙',40],
        cold:"冷",
        hot:'熱',
        chocolate:'巧克力',
        vanilla:'香草',
        strawberry:'草莓',
        cantaloupe:'哈密瓜',
        mango:'芒果',
        blueberry:'藍莓',
        sea_salt_cream:'海鹽奶油',
        milk:'牛奶',
        original:'原味',
        caramel:'焦糖'
        };

function delete1() {
    $('.mark').hide();
    $('.mark').remove();
}

function clickPictureA(str,str2) {
    delete1();
    var div = "<div class='mark'><div class='left'><img class='picture'src='' alt=''><div class='name'>名稱</div></div><div class='right'><div id='select'></div><div class='button_frame'><button onclick='add()'class='add'>+</button><input type='text' value='0' id='count'><button onclick='mulit()'class='mulit'>-</button></div><div class='button_frame'><button onclick='clickCheck()' class='check' id='check'>確認</button><button onclick='clickCancel()' class='cancel' id='cancel'>刪除</button></div></div></div>";
    $('body').append(div);
    $('.name').text(str2);
    $('.left .picture').attr('src', '../Resources/' + str);

}

function clickPictureB(str,str2,str3){
    delete1();
    var div = "<div class='mark'><div class='left'><img class='picture'src='' alt=''><div class='name'>名稱</div></div><div class='right'><div id='select'><select id='personalize'></select></div><div class='button_frame'><button onclick='add()'class='add'>+</button><input type='text' value='0' id='count'><button onclick='mulit()'class='mulit'>-</button></div><div class='button_frame'><button onclick='clickCheck()' class='check' id='check'>確認</button><button onclick='clickCancel()' class='cancel' id='cancel'>刪除</button></div></div></div>";
    var selectHtml=""
    $('body').append(div);
    $('.name').text(str2);
    $('.left .picture').attr('src', '../Resources/' + str);
    console.log(str3);
    for(var i=0;i<str3.length;i++){
        var temp=str3[i]
        var divb="<option value='"+str3[i]+"'>"+title[temp]+"</option>"
        $('#personalize').append(divb);
        console.log(divb);
    }
}
function clickCancel(){
    delete1();
}

function clickCheck(){
    var twice = true;
    if(parseInt($('#count').val()) > 0){
        var len=$('.left .picture').attr('src').split('/').length;
        var dict={name:$('.left .picture').attr('src').split('/')[len-1].split('.')[0],value:parseInt($('#count').val())};
        if($('#personalize').length>0 ){
            dict.personalize=$('#personalize').val();
        }else{
             dict.personalize='';
        }
        for(var i=0;i<list.length;i++){
        if(list[i].name == dict.name && list[i].personalize == dict.personalize){
            list[i].value+=dict.value;
            twice=false;
            }
        }
        if(twice){
            list.push(dict);
        }
        console.log(list);
        }
    delete1();
    add_menu();
}

function add(){
    $('#count').attr('value',parseInt($('#count').val())+1);
}

function mulit(){
    if (parseInt($('#count').val())>0){
        $('#count').attr('value',parseInt($('#count').val())-1);
    }
}

function addb(str){
    $('#'+str+'_list #countB').attr('value',parseInt($('#'+str+'_list #countB').val())+1);
    recount();
}

function mulitb(str){
    if (parseInt($('#'+str+'_list #countB').val())>0){
        $('#'+str+'_list #countB').attr('value',parseInt($('#'+str+'_list #countB').val())-1);
    }
    recount();
}

function recount(){
    for(var i=0;i<list.length;i++){
            list[i].value=parseInt($('#'+list[i].name+'_list #countB').val());
    }
    add_menu();
}
function jumpValue(str){
    var stra='?name=';
    for(var i=0 ;i<list.length;i++){
        stra+=list[i].name+' ';
    }
    stra+='&value='
    for(var i=0 ;i<list.length;i++){
        stra+=list[i].value+' ';
    }
    stra+='&personalize='
    for(var i=0 ;i<list.length;i++){
        stra+=list[i].personalize+' ';
    }
    $('#'+str).attr('href',$('#'+str).attr('href')+stra);
    console.log('./'+str+'.html'+stra);
}

function add_menu(){
    if ($('.resultMenu').length>0){
         $('.resultMenu').remove();
    }
    var total=0;
    var templist=[];
    for(var i=0;i<list.length;i++){
        
        if(list[i].value>0){
            var temp=list[i].name;
            var Name=title[temp];
            var value=list[i].value;
            var tempName="\""+list[i].name+"\"";
            var tempValue='';
            if (list[i].personalize!=''){
                tempValue=title[list[i].personalize];
            }
            var div="<div class='resultMenu' id='"+list[i].name+"_list'><div>"+Name[0]+"</div><div>"+tempValue+"</div><div class='value_button'><button onclick='addb("+tempName+")' class='check'>+</button><input id='countB' value='"+value+"'></input><button onclick='mulitb("+tempName+")' class='cancel'>-</button></div><div>$:"+value*Name[1]+"</div></div>";
            $('.resultBox').append(div);
            total+=Name[1]*value;
        }else{
            templist.push(i);
            console.log(templist);
        }
        
    }
    if(templist.length > 0){
        for(var i=0;i<templist.length;i++){
            list.splice(templist[i]-i,1);
            console.log(templist[i]);
        }
    }
    if($('.resultMenu').length>0){
        var diva="<div class='resultMenu' style='border-top:1px solid #000;'><div></div><div></div><div>總價格</div><div id='totalB'> $:"+total+"</div></div>";
        $('.resultBox').append(diva);
        var divb="<div class='resultMenu'><button class='checkout' onclick='checkout()' >結帳</button></div>";
        $('.resultBox').append(divb);
            console.log(total);
    }

}

function take_over_value(Name,Value,Personalizea){
    for(var i=0;i<Name.length-1;i++){
        var temp={name:Name[i],value:parseInt(Value[i]),personalize:Personalizea[i]};
        list.push(temp);
    }
    console.log(list);  
}

function checkout(){
    var div = "<div class='mark1'><div class='icon'><i class='fas fa-check-circle'></i></div><div class='checkValue'>送出訂單</div></div>";
    $('body').append(div);
    setTimeout(() => {
        window.location.assign('./food.html');
    }, 2000);
    

}