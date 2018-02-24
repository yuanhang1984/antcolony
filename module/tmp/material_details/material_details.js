/**
 * @author wangdi
 */
function MaterialDetails(rows, showRows) {
  //分页material_pages
  this.rows = rows;
  this.showRows = showRows;
  this.currentOffset = 0;
  this.materialCondition = {};
  // 原料数据 
  this.materialDetailsData = {"data":[
    {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111111"},
    {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111112"},
    {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111113"}
  ]}; 

  //清空数据
  this.clearRawData = function(potUuid) {
   $("#material_details_content_box").html('<tr><td colspan="4" align="center">没数据</td></tr>');
   //$("#tank_breakdown_content" + potUuid).find("#material_details_content_box").html('<tr><td colspan="4" align="center">没数据</td></tr>');
  };
  //数据库数据覆盖
  this.serverDataCover = function(potUuid) {
    //获取储罐原料记录分页
    var totalRows = 0;
    delete this.materialCondition["rows"];
    delete this.materialCondition["offset"];
    this.materialCondition["material_uuid"] = potUuid;
    var url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialRecord&data_count=1";
    var getContract = ajax_assistant(url, this.materialCondition, false, true, false);
    if(1 == getContract.status) {
      if (0 == getContract.count) {
        $("#material_pages").html("");
      } else {
        var materialDetailTotalResult = JSON.parse(getContract.result);
        totalRows = getContract.count;      
        generate_bootstrap_pagination_ctrl("#material_pages", this.currentOffset, this.rows, this.showRows, totalRows);
        this.materialCondition["rows"] = this.rows;
        this.materialCondition["offset"] = this.currentOffset;
      }
    } else {
      alert("储罐原料记录数据获取失败");
      return;
    } 
    //获取储罐原料记录
    url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehousePotMaterialRecord";
    var getContract = ajax_assistant(url, this.materialCondition, false, true, false);
    console.log(getContract);
    this.materialDetailsData = {};
    if (1 == getContract.status) {
      if (0 == getContract.count) {
        this.materialDetailsData = {};
      } else {
        var tmpAll = new Array();
        var materialDetailsGetResult = JSON.parse(getContract.result);  
        console.log(materialDetailsGetResult);
        for (var i = 0; i < materialDetailsGetResult.length; i++) {
          tmpAll[i] = {"tank_uuid":materialDetailsGetResult[i].material_uuid, "put_time":materialDetailsGetResult[i].entry_datetime, "put_storage":materialDetailsGetResult[i].entry_value, "uuid":materialDetailsGetResult[i].uuid};
        }
        this.materialDetailsData["data"] = tmpAll;
      }
    } else {
      alert("采购对账单数据获取失败");
    } 
  };

  //填充数据
  this.fillVariableData = function(potUuid) {
    if (isJsonObjectHasData(this.materialDetailsData)) {
     var materialDetailsHtml = "";
     for (var i = 0; i < this.materialDetailsData.data.length; i++) {
       var materialDetailsPutTime = this.materialDetailsData.data[i].put_time;
       materialDetailsPutTime = materialDetailsPutTime.substring(0, materialDetailsPutTime.indexOf(' '));
       materialDetailsHtml +=
         '<tr >'+
           '<td>' + i + '</td>'+
           '<td>' + materialDetailsPutTime + '</td>'+
           '<td>' + this.materialDetailsData.data[i].put_storage + '</td>'+
           '<td><span class = "glyphicon glyphicon-remove material_details_remove" tank_uuid = "' + this.materialDetailsData.data[i].tank_uuid + '" uuid = "' + this.materialDetailsData.data[i].uuid + '"></span></td>'+
         '</tr>';
     }
      $("#material_details_content_box").html(materialDetailsHtml);
    } else {
      $("#material_details_content_box").html('<tr><td colspan="4" align="center">没数据</td></tr>');
    }
  };
  //初始化事件
  this.initEvent = function () {
    var currentObj = this;
    //添加模态框
    $(document).on("click","#material_details_plus",function() {
      currentObj.addModle($(this)); 
    });
    //添加数据
    $(document).on("click","#material_add_modle_prop_btn",function() {
      currentObj.addData($(this)); 
    });
    //删除模态框
    $(document).on("click",".material_details_remove",function() {
      currentObj.removeModle($(this));
    });
    //删除数据
    $(document).on("click","#material_delete_modle_prop_btn",function() {
      currentObj.removeData($(this));
    });
  };
  
  //点击分页
  this.pagesFunc = function(obj) {
    this.currentOffset = obj.attr("data-offset");
    var potDetailsUuid = obj.parent().parent().parent().attr("tank_uuid");
    this.materialCondition["offset"] = this.currentOffset;
    this.serverDataCover(potDetailsUuid);
    this.fillVariableData(potDetailsUuid); 
  };

  //添加模态框
  this.addModle = function(obj) {
    var potDetailsUuid = obj.attr("tank_uuid");
    var mateialAddHtml = 
      `<div class = "modal fade custom_modal" id = "material_add_modle_prop" tabindex = "-1" role = "dialog">
        <div class = "modal-dialog modal-sm" role = "document">
          <div class = "modal-content">
            <div class = "modal-header bg-primary">
              <button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>
              <h4 class = "modal-title">添加入库明细</h4>
            </div>
            <div class = "modal-body nopadding-bottom">
               <div class = "form-group has-feedback">
               <div class = "input-group">
                 <span class = "input-group-addon">入库时间</span>
                 <input type = "text" class = "form-control widget_datepicker material_details_time"  value = "">
               </div>
               <span class = "glyphicon glyphicon-calendar form-control-feedback" ></span>
             </div>
                <div class="form-group has-feedback">
                   <div class="input-group">
                     <span class="input-group-addon">入库值</span>
                     <input type="text" class="form-control material_details_put_val">
                   </div>
                </div>
            </div>
            <div class = "modal-footer noborder nopadding-top" style = "text-align: center;">
              <button type = "button" class = "btn btn-primary" id = "material_add_modle_prop_btn"  tank_uuid = "${potDetailsUuid}">添加</button>
              <button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>
            </div>
          </div>
        </div>
      </div>`;
//     var mateialAddHtml = 
//         '<div class = "modal fade custom_modal" id = "material_add_modle_prop" tabindex = "-1" role = "dialog">'+
//           '<div class = "modal-dialog modal-sm" role = "document">'+
//             '<div class = "modal-content">'+
//               '<div class = "modal-header bg-primary">'+
//                 '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
//                 '<h4 class = "modal-title">添加入库明细</h4>'+
//               '</div>'+
//               '<div class = "modal-body nopadding-bottom">'+
//                  '<div class = "form-group has-feedback">'+
//   '              <div class = "input-group">'+
//   '                <span class = "input-group-addon">入库时间</span>'+
//   '                <input type = "text" class = "form-control widget_datepicker material_details_time"  value = "">'+
//   '              </div>'+
//   '              <span class = "glyphicon glyphicon-calendar form-control-feedback" ></span>'+
//   '            </div>'+ 
//                   '<div class="form-group has-feedback">'+
//                      '<div class="input-group">'+
//                        '<span class="input-group-addon">入库值</span>'+
//                        '<input type="text" class="form-control material_details_put_val">'+
//                      '</div>'+
//                   '</div>'+
//               '</div>'+
//               '<div class = "modal-footer noborder nopadding-top" style = "text-align: center;">'+
//                 '<button type = "button" class = "btn btn-primary" id = "material_add_modle_prop_btn"  tank_uuid = "' + potDetailsUuid + '">添加</button>'+
//                 '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
//               '</div>'+
//             '</div>'+
//           '</div>'+
//       '</div>';
    $("body").append(mateialAddHtml);
    $("#material_add_modle_prop").modal("show");
    $("#material_add_modle_prop").on("hidden.bs.modal", function(e) {
      $(this).remove();
    }); 
  };

  //添加数据
  this.addData = function(obj) {
    var potDetailsUuid = obj.attr("tank_uuid");
    var materialDetailsTime = obj.parents("#material_add_modle_prop").find(".material_details_time").val();
    if (0 < materialDetailsTime.length) {
      materialDetailsTime += ' 00:00:00';
    }
    var materialDetailsPutVal = obj.parents("#material_add_modle_prop").find(".material_details_put_val").val();
    if (null == materialDetailsTime.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)) {
      alert("请选择入库时间！");
      return;
    }
    if (null == materialDetailsPutVal.match(/^[0-9]+\.{0,1}[0-9]{0,4}$/)) {
      alert("请输入正确的入库值！");
      return;
    }
    var material_data = {
       "material_uuid":potDetailsUuid,
       "entry_value":materialDetailsPutVal,
       "entry_datetime":materialDetailsTime
    };
    //var materialDetailsAddUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=addWarehousePotMaterialRecord";
    //var materialDetailsAddGetContract = ajax_assistant(materialDetailsAddUrl, material_data, false, true, false);
    //if ("1" != materialDetailsAddGetContract.status) {
    if ("123" != materialDetailsPutVal) {
      alert("添加原料失败");
    } else {  
      // 更新页面数据
      this.clearRawData(potDetailsUuid);
      //this.serverDataCover(potDetailsUuid);
      
      this.materialDetailsData = {"data":[
        {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111111"},
        {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111111"},
        {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111112"},
        {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111113"}
      ]}; 
      this.fillVariableData(potDetailsUuid);
      $("#material_add_modle_prop").modal("hide");
      $("#material_add_modle_prop").on("hidden.bs.modal", function(e) {
        $(this).remove();
      });
    }
  };

  //删除按钮
  this.removeModle = function(obj) {
    var materialUuid = obj.attr("uuid");
    var potDetailsUuid = obj.attr("tank_uuid");
    var materialDeleteHtml = 
        '<div class = "modal fade custom_modal" id = "material_delete_modle_prop" tabindex = "-1" role = "dialog">'+
          '<div class = "modal-dialog modal-sm" role = "documeint">'+
            '<div class = "modal-content">'+
              '<div class = "modal-header bg-primary">'+
                '<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>'+
                '<h4 class = "modal-title">删除原料明细确认</h4>'+
              '</div>'+
              '<div class = "modal-body nopadding-bottom"  style = "text-align: center;">确认要删除吗？</div>'+
              '<div class = "modal-footer noborder nopadding-top" style = "text-align: center;">'+
                '<button type = "button" class = "btn btn-danger" id = "material_delete_modle_prop_btn" tank_uuid = "' + potDetailsUuid + '" uuid = "' + materialUuid + '">删除</button>'+
                '<button type = "button" class = "btn btn-default" data-dismiss = "modal">取消</button>'+
              '</div>'+
            '</div>'+
          '</div>'+
      '</div>';
    $("body").append(materialDeleteHtml);
    $("#material_delete_modle_prop").modal("show");
    $("#material_delete_modle_prop").on("hidden.bs.modal", function(e) {
      $(this).remove();
    });
  };

  //删除数据
  this.removeData = function(obj) {
    var uuid = obj.attr("uuid");
    var potDetailsUuid = obj.attr("tank_uuid");
    var data = {
      "uuid":uuid
    };
    //接口数据
    //var materialDetailsDeleteDataUrl = PROJECT_PATH + "lego/lego_fjTrade?servletName=removeWarehousePotMaterialRecord";
    //var materialDetailsDeleteDataGet = ajax_assistant(materialDetailsDeleteDataUrl, data, false, true, false);
    //if ("1" != materialDetailsDeleteDataGet.status){
    if ("11111111111" != uuid){
      alert("删除储罐失败");
    } else {  
      // 更新页面数据
      this.clearRawData(potDetailsUuid);
      //this.serverDataCover(potDetailsUuid);
      this.materialDetailsData = {"data":[
         {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111112"},
         {"tank_uuid":"00000000000000000000000000000001", "warehouse_uuid":"133333333333333333333333333333331", "put_time":"2017-08-03 00:00:00", "put_storage":"1000", "uuid":"11111111113"}
       ]}; 
      this.fillVariableData(potDetailsUuid);
      $("#material_delete_modle_prop").modal("hide");
      $("#material_delete_modle_prop").on("hidden.bs.modal", function(e) {
        $(this).remove();
      });
    }
  };

  //输出文本
  this.materialOutput = function(contentBox) {
    var content = 
     '<div class="panel panel-primary ">'+
     '  <div class="panel-heading clearfix">原料明细<span class = "glyphicon glyphicon-plus pull-right" id = "material_details_plus"></span></div>'+
     '  <div class="panel-body">'+
     '    <table class="table">'+
     '      <thead>'+
     '        <tr>'+
     '          <th>#</th>'+
     '          <th>入库时间</th>'+
     '          <th>入库值</th>'+
     '          <th>删除</th>'+
     '        </tr>'+
     '      </thead>'+
     '      <tbody id = "material_details_content_box">'+
     '        <tr>'+
     '          <td>1</td>'+
     '          <td>2017-03-19</td>'+
     '          <td>-200</td>'+
     '          <td><span class = "glyphicon glyphicon-remove"></span></td>'+
     '        </tr>'+
     '        <tr>'+
     '          <td>2</td>'+
     '          <td>2017-03-19</td>'+
     '          <td>-200</td>'+
     '          <td><span class = "glyphicon glyphicon-remove"></span></td>'+
     '        </tr>'+
     '          <td>3</td>'+
     '          <td>2017-03-19</td>'+
     '          <td>-200</td>'+
     '          <td><span class = "glyphicon glyphicon-remove"></span></td>'+
     '        </tr>'+
     '      </tbody>'+
     '    </table>'+
     '  </div>'+
     '  <div id = "material_pages" class = " clearfix">'+
     '    <nav aria-label="Page navigation" style="text-align: right;">'+
     '      <ul class="pagination">'+
     '        <li class="active"><span href="#">1</span></li>'+
     '      </ul>'+
     '    </nav>'+
     '  </div>'
     '</div>';
   $(contentBox).html(content); 
  };
};
