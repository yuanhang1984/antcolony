/**
 * @author wangdi
 */
function WarehousePotDetails() {
  //原料记录的对象
  //var materialDetails = new MaterialDetails();
  // 储罐信息
  this.potDetailsData = {"data":[
   {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料a", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000001"},
   {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料b", "put_storage":"7777777000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000002"},
   {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料c", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000003"}]
  }; 

  //清空数据
  this.clearRawData = function(warehouseUuid) {
    $("#warehouse_detailes_content" + warehouseUuid).find("#warehouse_pot_details_content_box").html('<tr><td colspan="6" align="center">没数据</td></tr>');
  };

  //服务器数据覆盖
  this.serverDataCover =function(warehouseUuid) {
    //获取所有原料的入库值总和
    var potMaterialSumUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialRecordSum";
    //获取原料明细
    var warehousePotData = {
      "pot_uuid":warehouseUuid 
    }
    var warehousePotDetailsUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterial";
    var warehousePotDetailsGetContract = ajax_assistant(warehousePotDetailsUrl, warehousePotData, false, true, false);
    this.potDetailsData = {};
    if (1 == warehousePotDetailsGetContract.status) {
      if (0 != warehousePotDetailsGetContract.count) {
        var warehousePotDetailsResult = JSON.parse(warehousePotDetailsGetContract.result);
        var tmpArr = new Array();
        for (var i = 0; i < warehousePotDetailsResult.length; i++) {
          var potiData = {
            "material_uuid":warehousePotDetailsResult[i].uuid
          } 
          var potMaterialSumGetContract = ajax_assistant(potMaterialSumUrl, potiData, false, true, false);
          var potMaterialSumResult = JSON.parse(potMaterialSumGetContract.result);
          console.log(potMaterialSumResult);
          var checkValueAll = warehousePotDetailsResult[i].check_value;  
          var difference_c = checkValueAll - potMaterialSumResult[0].sum;
          tmpArr[i] = {"warehouse_uuid":warehousePotDetailsResult[i].pot_uuid, "ingredient_name":warehousePotDetailsResult[i].name,  "put_storage":potMaterialSumResult[0].sum, "cull_value":checkValueAll, "difference":difference_c, "uuid":warehousePotDetailsResult[i].uuid};
        }
        this.potDetailsData["data"] = tmpArr; 
      } else {
        this.potDetailsData = {};
      }
    } else {
      alert("获取原料明细失败");
    }
  };

  //填充数据
  this.fillVariableData = function(warehouseUuid) {
    if (isJsonObjectHasData(this.potDetailsData)) {
     var warehousePotDetailsHtml = "";
     for (var i = 0; i < this.potDetailsData.data.length; i++) {
       warehousePotDetailsHtml +=
         '<tr class = "warehouse_pot_details_tr">'+
           '<td width = "10%"><button type = "button" class = "btn btn-info btn-xs warehouse_pot_details_open_btn" warehouse_uuid = "'+ this.potDetailsData.data[i].warehouse_uuid + '"  uuid = "' + this.potDetailsData.data[i].uuid + '"><span class = "glyphicon glyphicon-chevron-down"></span></button></td>'+
           '<td width = "20%" style = "text-align: center;">'+
             '<div class="input-group">'+
               '<input type="text" class="form-control warehouse_pot_ingredient_val" value = "' + this.potDetailsData.data[i].ingredient_name + '">'+
               '<span class="input-group-addon warehouse_pot_ingredient_icon" warehouse_uuid = "'+ this.potDetailsData.data[i].warehouse_uuid +'" uuid = "' +  this.potDetailsData.data[i].uuid + '"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
             '</div>'+
           '</td>'+
           '<td width = "20%" style = "text-align: center;">' + this.potDetailsData.data[i].put_storage + '</td>'+
           '<td width = "20%" style = "text-align: center;">'+
           '   <div class="input-group">'+
           '     <input type="text" class="form-control warehouse_pot_cull_value" value = "' + this.potDetailsData.data[i].cull_value + '">'+
           '     <span class="input-group-addon warehouse_pot_cull_icon" warehouse_uuid = "'+ this.potDetailsData.data[i].warehouse_uuid +'" uuid = "' +  this.potDetailsData.data[i].uuid + '"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
           '   </div>'+
           ' </td>'+
           '<td width = "20%" style = "text-align: center;">' + this.potDetailsData.data[i].difference + '</td>'+
           '<td width = "10%"><span class = "glyphicon glyphicon-remove warehouse_pot_details_remove" warehouse_uuid = "'+ this.potDetailsData.data[i].warehouse_uuid +'" uuid = "' + this.potDetailsData.data[i].uuid + '"></span></td>'+
         '</tr>';
     }
      
      $("#warehouse_detailes_content" + warehouseUuid).find("#warehouse_pot_details_content_box").html('<tr><td colspan="6" align="center">没数据</td></tr>');
    } else {
      $("#warehouse_detailes_content" + warehouseUuid).find("#warehouse_pot_details_content_box").html('<tr><td colspan="6" align="center">没数据</td></tr>');
    }
  };
  //初始化事件
  this.initEvent = function () {
    var currentObj = this;
    //展开自己按钮
    $(document).on("click", ".warehouse_pot_details_open_btn", function() {
      currentObj.openInfoFunc($(this));
    });
    //添加模态框
    $(document).on("click", "#warehouse_pot_add_plus", function() {
      currentObj.addModle($(this));
    });
    //添加数据
    $(document).on("click", "#warehouse_pot_add_modle_prop_btn", function() {
      currentObj.addData($(this));
    });
    //修改原料名称
    $(document).on("click", ".warehouse_pot_ingredient_icon", function() {
      currentObj.editName($(this));
    });
    //修改检尺值
    $(document).on("click", ".warehouse_pot_cull_icon", function() {
      currentObj.editCull($(this));
    });
    //删除模态框
    $(document).on("click", ".warehouse_pot_details_remove", function() {
      currentObj.removeModle($(this));
    });
    //删除数据
    $(document).on("click", "#warehouse_pot_delete_modle_prop_btn", function() {
      currentObj.removeData($(this));
    });
  };

  //展开库区明细
  this.openInfoFunc = function(obj) {
    var warehousePotDetailsUuid = obj.attr("uuid");
    var warehousePotDetailsSubHtml =
      '<tr class = "warehouse_pot_details_sub_all">'+
        '<td colspan="11">'+
          '<div class="row">'+
            '<div class="col-lg-12">'+
              '<div id = "warehouse_pot_details_content' + warehousePotDetailsUuid + '"></div>'+
            '</div>'+
          '</div>'+
        '</td>'+
      '</tr>';
    if (obj.hasClass("active")) {
      obj.find(".glyphicon").removeClass("glyphicon-chevron-up");
      obj.removeClass("active");
      obj.parent().parent().nextUntil(".warehouse_pot_details_tr").remove();
      warehousePotDetailsSubHtml = "";
    } else {
      obj.find(".glyphicon").addClass("glyphicon-chevron-up");
      obj.addClass("active");
      obj.parent().parent().after(warehousePotDetailsSubHtml);
    }
//    materialDetails.material_output("#warehouse_pot_details_content" + warehousePotDetailsUuid);
//    $("#warehouse_pot_details_content" + warehousePotDetailsUuid).find("#material_breakdown_plus").attr("warehouse_pot_uuid", warehousePotDetailsUuid);
 //   $("#warehouse_pot_details_content" + warehousePotDetailsUuid).find("#material_pages").attr("warehouse_pot_uuid", warehousePotDetailsUuid);
 //   materialDetails.material_breakdown_clear_raw_data(warehousePotDetailsUuid);
 //   materialDetails.material_breakdown_server_data_cover(warehousePotDetailsUuid);
 //   materialDetails.material_breakdown_fill_variable_data(warehousePotDetailsUuid);
  };

  //添加模态框
  this.addModle = function(obj) {
    var warehouseUuid = obj.attr("warehouse_uuid");
    var warehousePotAddHtml = 
        '<div class = "modal fade custom_modal" id = "warehouse_pot_add_modle_prop" tabindex = "-1" role = "dialog">'+
          '<div class = "modal-dialog modal-sm" role = "document">'+
            '<div class = "modal-content">'+
              '<div class = "modal-header bg-primary">'+
                '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
                '<h4 class = "modal-title">添加原料名称</h4>'+
              '</div>'+
              '<div class = "modal-body nopadding-bottom">'+
                 '<div class="form-group has-feedback">'+
                    '<div class="input-group">'+
                       '<span class="input-group-addon">原料名称</span>'+
                       '<input type="text" class="form-control warehouse_pot_material_name">'+
                     '</div>'+
                  '</div>'+
                 '<div class="form-group has-feedback">'+
                    '<div class="input-group">'+
                       '<span class="input-group-addon">检尺值</span>'+
                       '<input type="text" class="form-control warehouse_pot_material_check_value">'+
                     '</div>'+
                  '</div>'+
              '</div>'+
              '<div class = "modal-footer noborder nopadding-top" style = "text-align: center;">'+
                '<button type = "button" class = "btn btn-primary" id = "warehouse_pot_add_modle_prop_btn"  warehouse_uuid = "' + warehouseUuid + '">添加</button>'+
                '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
              '</div>'+
            '</div>'+
          '</div>'+
      '</div>';
    $("body").append(warehousePotAddHtml);
    $("#warehouse_pot_add_modle_prop").modal("show");
    $("#warehouse_pot_add_modle_prop").on("hidden.bs.modal", function(e) {
      $(this).remove();
    });  
  };

  //添加数据
  this.addData = function(obj) {
    var warehouseUuid = obj.attr("warehouse_uuid");
    var warehousePotMaterialName = obj.parents("#warehouse_pot_add_modle_prop").find(".warehouse_pot_material_name").val();
    var warehousePotMaterialCheckValue = obj.parents("#warehouse_pot_add_modle_prop").find(".warehouse_pot_material_check_value").val();
    if (null == warehousePotMaterialName.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{1,32}$/)) {
      alert("请输入正确的原料名称！");
      return;
    }
    if (null == warehousePotMaterialCheckValue.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)) {
      alert("请输入正确的检尺值！");
      return;
    }
    var warehousePotData = {
       "pot_uuid":warehouseUuid,
       "name":warehousePotMaterialName,
       "check_value":warehousePotMaterialCheckValue
    }
    console.log(warehouseUuid)
    //var detailsAddUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=addWarehousePotMaterial";
    //var detailsAddGetContract = ajax_assistant(detailsAddUrl, warehousePotData, false, true, false);
    //if ("1" == detailsAddGetContract.status) {
    if ("abc" == warehousePotMaterialName) {
      this.clearRawData(warehouseUuid);
      //this.serverDataCover(warehouseUuid);
      this.potDetailsData = {"data":[
       {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料a", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000001"},
       {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料a", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000001"},
       {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料b", "put_storage":"7777777000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000002"},
       {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料c", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000003"}]
      }; 
      this.fillVariableData(warehouseUuid);
      $("#warehouse_pot_add_modle_prop").modal("hide");
      $("#warehouse_pot_add_modle_prop").on("hidden.bs.modal", function(e) {
        $(this).remove();
      });
    } else {
      alert("添加储罐明细失败")
    }
  };

  //修改原料名称
  this.editName = function(obj) {
    var warehouseUuid = obj.attr("warehouse_uuid"); 
    var uuid = obj.attr("uuid");
    var warehousePotMaterialName = obj.siblings(".warehouse_pot_ingredient_val").val();
    if(null == warehousePotMaterialName.match(/^[\u4e00-\u9fffa0-9a-zA-Z]{1,32}$/)) {
      alert("请输入正确的原料名称！");
      return;
    }
    var data = {
      "uuid":uuid,
      "name":warehousePotMaterialName
    } 
    //var detailsEditNameDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterial";
    //var editNameDeleteDataGet = ajax_assistant(detailsEditNameDataUrl, data, false, true, false);
    //if ("1" == editNameDeleteDataGet.status) {
      if ("abc" == warehousePotMaterialName) {
      this.clearRawData(warehouseUuid);
      //this.serverDataCover(warehouseUuid);
      this.potDetailsData = {"data":[
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料aaaaaaa", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000001"},
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料b", "put_storage":"7777777000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000002"},
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料c", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000003"}]
       }; 
      this.fillVariableData(warehouseUuid);
      alert("修改原料名称成功")
    } else {
      alert("修改原料名称失败")
    }
  };

  //修改检尺值
  this.editCull = function(obj) {
    var uuid = obj.attr("uuid");
    var warehouseUuid = obj.attr("warehouse_uuid");
    var warehousePotEditCull = obj.siblings(".warehouse_pot_cull_value").val();
    if (null == warehousePotEditCull.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)) {
      alert("请输入正确的检尺值！");
      return;
    }
    var data = {
      "uuid":uuid,
      "check_value":warehousePotEditCull
    }
    //var detailsEditCullDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=modifyWarehousePotMaterial";
    //var detailsEditCullDeleteDataGet = ajax_assistant(detailsEditCullDataUrl, data, false, true, false);
    //if ("1" == detailsEditCullDeleteDataGet.status) {
    if ("123" == warehousePotEditCull) {
      alert("修改检尺值成功");
      this.clearRawData(warehouseUuid);
      //this.serverDataCover(warehouseUuid);
      this.potDetailsData = {"data":[
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料a", "put_storage":"1000", "cull_value":"1888888", "difference":"-200", "uuid":"00000000000000000000000000000001"},
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料b", "put_storage":"7777777000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000002"},
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料c", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000003"}]
       }; 
      this.fillVariableData(warehouseUuid);
    } else {
      alert("修改检尺值失败");
    }
  };

  //删除按钮
  this.removeModle = function(obj) {
    var warehousePotUuid = obj.attr("uuid");
    var warehouseUuid = obj.attr("warehouse_uuid");
    var warehousePotDeleteHtml = 
        '<div class = "modal fade custom_modal" id = "warehouse_pot_delete_modle_prop" tabindex = "-1" role = "dialog">'+
          '<div class = "modal-dialog modal-sm" role = "document">'+
            '<div class = "modal-content">'+
              '<div class = "modal-header bg-primary">'+
                '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
                '<h4 class = "modal-title">删除储罐明细确认</h4>'+
              '</div>'+
              '<div class = "modal-body nopadding-bottom"  style = "text-align: center;">确认要删除吗？</div>'+
              '<div class = "modal-footer noborder nopadding-top" style = "text-align: center;">'+
                '<button type = "button" class = "btn btn-danger" id = "warehouse_pot_delete_modle_prop_btn" warehouse_uuid = "'+ warehouseUuid +'" uuid = "' + warehousePotUuid + '">删除</button>'+
                '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
              '</div>'+
            '</div>'+
          '</div>'+
      '</div>';
    $("body").append(warehousePotDeleteHtml);
    $("#warehouse_pot_delete_modle_prop").modal("show");
    $("#warehouse_pot_delete_modle_prop").on("hidden.bs.modal", function(e) {
      $(this).remove();
    });
  };

  //删除数据
  this.removeData = function(obj) {
    var uuid = obj.attr("uuid");
    var warehouseUuid = obj.attr("warehouse_uuid");
    var data = {
      "uuid":uuid
    };
    //接口数据
    //var detailsDeleteDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=removeWarehousePotMaterial";
    //var detailsDeleteDataGet = ajax_assistant(detailsDeleteDataUrl, data, false, true, false);
    //if ("1" != detailsDeleteDataGet.status){
    if ("00000000000000000000000000000001" != uuid) {
      alert("删除储罐失败");
    } else {  
      // 更新页面数据
      this.clearRawData(warehouseUuid);
      //this.serverDataCover(warehouseUuid);
       this.potDetailsData = {"data":[
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料b", "put_storage":"7777777000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000002"},
        {"warehouse_uuid":"133333333333333333333333333333331", "ingredient_name":"原料c", "put_storage":"1000", "cull_value":"10000", "difference":"-200", "uuid":"00000000000000000000000000000003"}]
       }; 
      this.fillVariableData(warehouseUuid);
      $("#warehouse_pot_delete_modle_prop").modal("hide");
      $("#warehouse_pot_delete_modle_prop").on("hidden.bs.modal", function(e) {
        $(this).remove();
      });
    }
  };

  //输出文本
  this.warehousePotOutput = function(contentBoxId) {
    var content = 
     '<div class="panel panel-primary ">'+
     '  <div class="panel-heading clearfix">储罐明细<span class = "glyphicon glyphicon-plus pull-right" id = "warehouse_pot_add_plus"></span></div>'+
     '  <div class="panel-body">'+
     '    <table class="table">'+
     '      <thead>'+
     '        <tr>'+
     '          <th>#</th>'+
     '          <th style = "text-align: center;">原料名称</th>'+
     '          <th style = "text-align: center;">入库值</th>'+
     '          <th style = "text-align: center;">检尺值</th>'+
     '          <th style = "text-align: center;">差值</th>'+
     '          <th>删除</th>'+
     '        </tr>'+
     '      </thead>'+
     '      <tbody id = "warehouse_pot_details_content_box">'+
     '        <tr>'+
     '          <td width = "10%"><button type = "button" class = "btn btn-info btn-xs"><span class = "glyphicon glyphicon-chevron-down"></span></button></td>'+
     '          <td width = "20%" style = "text-align: center;">'+
     '            <div class="input-group">'+
     '              <input type="text" class="form-control" value = "原料a">'+
     '              <span class="input-group-addon warehouse_pot_ingredient_icon"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
     '            </div>'+
     '          </td>'+
     '          <td>100</td>'+
     '          <td width = "20%" style = "text-align: center;">'+
     '            <div class="input-group">'+
     '              <input type="text" class="form-control" value = "原料a">'+
     '              <span class="input-group-addon warehouse_pot_cull_icon"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
     '            </div>'+
     '          </td>'+
     '          <td width = "20%" style = "text-align: center;">-200</td>'+
     '          <td width = "10%" style = "text-align: center;"><span class = "glyphicon glyphicon-remove"></span></td>'+
     '        </tr>'+
     '        <tr>'+
     '          <td width = "10%"><button type = "button" class = "btn btn-info btn-xs"><span class = "glyphicon glyphicon-chevron-down"></span></button></td>'+
     '          <td width = "20%" style = "text-align: center;">'+
     '            <div class="input-group">'+
     '              <input type="text" class="form-control" value = "原料b" >'+
     '              <span class="input-group-addon warehouse_pot_ingredient_icon"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
     '            </div>          </td>'+
     '          <td width = "20%" style = "text-align: center;">3000</td>'+
     '          <td width = "20%" style = "text-align: center;">'+
     '            <div class="input-group">'+
     '              <input type="text" class="form-control" value = "原料a">'+
     '              <span class="input-group-addon warehouse_pot_cull_icon"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
     '            </div>'+
     '          </td>'+
     '          <td width = "20%" style = "text-align: center;">-200</td>'+
     '          <td width = "10%"><span class = "glyphicon glyphicon-remove"></span></td>'+
     '        </tr>'+
     '        <tr>'+
     '          <td width = "10%"><button type = "button" class = "btn btn-info btn-xs"><span class = "glyphicon glyphicon-chevron-down"></span></button></td>'+
     '          <td width = "20%" style = "text-align: center;">'+
     '            <div class="input-group">'+
     '              <input type="text" class="form-control" value = "原料a" >'+
     '              <span class="input-group-addon warehouse_pot_ingredient_icon"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
     '            </div>'+
     '          </td>'+
     '          <td width = "20%" style = "text-align: center;">3000</td>'+
     '          <td width = "20%" style = "text-align: center;" width = "300">'+
     '            <div class="input-group">'+
     '              <input type="text" class="form-control" value = "原料a">'+
     '              <span class="input-group-addon warehouse_pot_cull_icon"><span class = "glyphicon glyphicon-floppy-disk"></span></span>'+
     '            </div>'+
     '          </td>'+
     '          <td width = "20%" style = "text-align: center;">-200</td>'+
     '          <td width = "10%"><span class = "glyphicon glyphicon-remove"></span></td>'+
     '        </tr>'+
     '      </tbody>'+
     '    </table>'+
     '  </div>'+
     '</div>';
   $(contentBoxId).html(content); 
  }
};
