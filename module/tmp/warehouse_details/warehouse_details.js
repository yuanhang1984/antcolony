/**
 * @author wangdi
 */
function WarehouseDetailes() {
  //储罐明细对象
  var potDetails = new WarehousePotDetails();
  // 储罐信息
  this.warehouseData = {"data":[
   {"name":"舟山纳海", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"133333333333333333333333333333331"},
   {"name":"舟山纳海", "put_storage":"2000", "cull_value":"10000", "difference":"-100", "uuid":"133333333333333333333333333333332"},
   {"name":"舟山纳海", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"133333333333333333333333333333333"}]
  }; 

  // 初始化
  this.initEvent = function() {
    var currentObj = this;
    $(".warehouse_detailes_open_btn").click(function() {
     currentObj.openInfoFunc($(this));
    });
  };

  //清空数据
  this.clearRawData = function() {
    $("#warehouse_detailes_content_box").html('<tr><td colspan="5" align="center">没数据</td></tr>');
  };

  //服务器数据覆盖
  this.serverDataCover = function() {
    //获取所有原料的入库值总和
    var sumUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialRecordSum";
    //获取储罐原料
    var potUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterial";
    var potGetContract = ajax_assistant(potUrl, "", false, true, false);
    //获取储罐
    var warehouseUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePot";
    var warehouseGetContract = ajax_assistant(warehouseUrl, "", false, true, false);
    this.warehouseData = {};
    if (1 == warehouseGetContract.status) {
      if (0 == warehouseGetContract.count) {
        this.warehouseData = {};
      } else {
        var tmpArr = new Array();
        var warehouseResult = JSON.parse(warehouseGetContract.result);  
        console.log(warehouseResult);
        for (var i = 0; i < warehouseResult.length; i++) {
          var putStorageAll = 0;
          var checkValueAll = 0;
          //获取原料成功
          if (1 == potGetContract.status) {
            var potMaterialResult = JSON.parse(potGetContract.result);
            if (0 == potGetContract.count) {
              alert("储罐原料没数据");
            } else {
              for (var j = 0; j < potMaterialResult.length; j++) {
                 if (warehouseResult[i].uuid == potMaterialResult[j].pot_uuid) {
                  var potData = {
                    "material_uuid":potMaterialResult[j].uuid
                  } 
                  var potMaterialSumGetContract = ajax_assistant(sumUrl, potData, false, true, false);
                  //获取入库值的总和
                  if ("1" == potMaterialSumGetContract.status) {
                    if ("0" != potMaterialSumGetContract.count) {
                       var potMaterialSumResult = JSON.parse(potMaterialSumGetContract.result);
                       putStorageAll += potMaterialSumResult[0].sum;
                       checkValueAll += potMaterialResult[j].check_value;
                    }
                  }
                }
              }
            }
          }
          var differenceAll = (checkValueAll - putStorageAll);
          tmpArr[i] = {"name":warehouseResult[i].name, "put_storage":putStorageAll, "cull_value":checkValueAll, "difference":differenceAll, "uuid":warehouseResult[i].uuid};
        }
        this.warehouseData["data"] = tmpArr; 
      }
    } else {
      alert("获取仓库失败");
    } 
  };

  //填充数据
  this.fillVariableData = function() {
    if (isJsonObjectHasData(this.warehouseData)) {
     var warehouseDetailesHtml = "";
     for (var i = 0; i < this.warehouseData.data.length; i++) {
       var name = this.warehouseData.data[i].name;
       var putStorage = this.warehouseData.data[i].put_storage;
       var cullValue = this.warehouseData.data[i].cull_value;
       var difference = this.warehouseData.data[i].difference;
       warehouseDetailesHtml +=
         '<tr class = "warehouse_detailes_tr">'+
           '<td><button type = "button" class = "btn btn-info btn-xs warehouse_detailes_open_btn" warehouse_uuid = "'+ this.warehouseData.data[i].uuid + '"><span class = "glyphicon glyphicon-chevron-down"></span></button></td>'+
           '<td>' + name + '</td>'+
           '<td>' + Number(putStorage).toFixed(2) + '</td>'+
           '<td>' + Number(cullValue).toFixed(2) + '</td>'+
           '<td>' + Number(difference).toFixed(2) + '</td>'+
         '</tr>';
     }
      $("#warehouse_detailes_content_box").html(warehouseDetailesHtml);
    } else {
      $("#warehouse_detailes_content_box").html('<tr><td colspan="5" align="center">没数据</td></tr>');
    }
  };

  //展开库区明细
  this.openInfoFunc = function(obj) {
    var warehouseDetailesUuid = obj.attr("warehouse_uuid");
    var warehouseDetailesSubHtml =
      '<tr class = "warehouse_detailes_sub_all">'+
        '<td colspan="11">'+
          '<div class="row">'+
            '<div class="col-lg-12">'+
              '<div id = "warehouse_detailes_content' + warehouseDetailesUuid + '">储罐明细</div>'+
            '</div>'+
          '</div>'+
        '</td>'+
      '</tr>';
    if (obj.hasClass("active")) {
      obj.find(".glyphicon").removeClass("glyphicon-chevron-up");
      obj.removeClass("active");
      obj.parent().parent().nextUntil(".warehouse_detailes_tr").remove();
      warehouseDetailesSubHtml = "";
    } else {
      obj.find(".glyphicon").addClass("glyphicon-chevron-up");
      obj.addClass("active");
      obj.parent().parent().after(warehouseDetailesSubHtml);
    }
    potDetails.warehousePotOutput("#warehouse_detailes_content" + warehouseDetailesUuid);
    $("#warehouse_detailes_content" + warehouseDetailesUuid).find("#warehouse_pot_add_plus").attr("warehouse_uuid", warehouseDetailesUuid);
    potDetails.clearRawData(warehouseDetailesUuid);
    //potDetails.serverDataCover(warehouseDetailesUuid);
    potDetails.fillVariableData(warehouseDetailesUuid);
  };
};
