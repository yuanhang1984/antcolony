/*
 * @author yangyongxia
 */
var enterprise_uuid_list = new Array();

var contract_list = new Array(); 

var warehouse_payment_detail_data = [
  {"sign_datetime": "2017-09-10","payment": 20000, "receipt": 2000,"capital_occupying": 200,"interest": 200},
  {"sign_datetime": "2017-09-11","payment": 20000, "receipt": 2000,"capital_occupying": 200,"interest": 200},
  {"sign_datetime": "2017-09-12","payment": 20000, "receipt": 2000,"capital_occupying": 200,"interest": 200},
  {"sign_datetime": "2017-09-13","payment": 20000, "receipt": 2000,"capital_occupying": 200,"interest": 200},
  {"sign_datetime": "2017-09-14","payment": 20000, "receipt": 2000,"capital_occupying": 200,"interest": 200},
  {"sign_datetime": "2017-09-15","payment": 20000, "receipt": 2000,"capital_occupying": 200,"interest": 200},
  {"sign_datetime": "2017-09-17","payment": 20000, "receipt": 2000,"capital_occupying": 200,"interest": 200},
  {"sign_datetime": "2017-09-18","payment": 20000, "receipt": 2000,"capital_occupying": 200,"interest": 200},
  {"sign_datetime": "2017-09-19","payment": 20000, "receipt": 2000,"capital_occupying": 200,"interest": 200},
  {"sign_datetime": "2017-09-19","payment": 20000, "receipt": 2000,"capital_occupying": 200,"interest": 200},
]

var  warehouse_payment_detail_work_area_data = {"data": [
  {"work_area_name": "库区1","work_area_uuid": "1"},
  {"work_area_name": "库区2","work_area_uuid": "2"},
  {"work_area_name": "库区3","work_area_uuid": "3"},
  {"work_area_name": "库区4","work_area_uuid": "4"},
  {"work_area_name": "库区5","work_area_uuid": "5"},
  {"work_area_name": "库区6","work_area_uuid": "6"},
  {"work_area_name": "库区7","work_area_uuid": "7"}
]};

/* *
 * 初始化
*/
function warehouse_payment_detail_clear_raw_data() {
  $("#warehouse_payment_detail_list_box").html('<tr><td colspan = "5" align = "center">请选择查询条件</td></tr>');
  $("#warehouse_payment_detail_warehouse").html("");
}

function warehouse_payment_detail_fill_variable_data_warehouse() {
  if (isJsonObjectHasData(warehouse_payment_detail_work_area_data)) {
    var work_area_select = '<option value = "">--请选择--</option>';
    for (var i = 0; i < warehouse_payment_detail_work_area_data.data.length; i++) {
      work_area_select += '<option value = "' + warehouse_payment_detail_work_area_data.data[i].work_area_uuid + '">' + warehouse_payment_detail_work_area_data.data[i].work_area_name + '</option>'
    }
    $("#warehouse_payment_detail_warehouse").html(work_area_select);
  }
}

/**
 * 赋值
*/
function warehouse_payment_detail_fill_variable_data() {
  if(isJsonObjectHasData(warehouse_payment_detail_data)) { 
    var content = "";
    for(var i = 0; i < warehouse_payment_detail_data.length; i++) { 
     content += 
       '<tr>'+
       ' <td>' + warehouse_payment_detail_data[i].sign_datetime + '</td>'+
       ' <td>' + warehouse_payment_detail_data[i].receipt + '</td>'+
       ' <td>' + warehouse_payment_detail_data[i].payment + '</td>'+
       ' <td>' + warehouse_payment_detail_data[i].capital_occupying + '</td>'+
       ' <td>' + warehouse_payment_detail_data[i].interest + '</td>'+
       '</tr>';
    }
    $("#warehouse_payment_detail_list_box").html(content);
  }
}

/* *
 * 合计
*/ 
function calc_total_data() {
  var payment = 0;
  var receipt = 0;
  var interest = 0;
  for(var i = 0; i < warehouse_payment_detail_data.length; i++) {
    payment += warehouse_payment_detail_data[i].payment; 
    receipt += warehouse_payment_detail_data[i].receipt; 
    interest += warehouse_payment_detail_data[i].interest; 
  }
  var content = 
    '<tr>'+
    ' <td>合计</td>'+
    ' <td>' + receipt + '</td>'+
    ' <td>' + payment + '</td>'+
    ' <td>&nbsp;</td>'+
    ' <td>' + interest + '</td>'+
    '</tr>';
  $("#warehouse_payment_detail_list_box").append(content);
}

/**
 * 获取库区
 */
function warehouse_payment_detail_get_warehouse() {
  var get_warehouse_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getWarehouse";
  var get_warehouse_param_data = {};
  var org_structure_get_warehouse = ajax_assistant(get_warehouse_url, get_warehouse_param_data, false, true, false);
  console.log(org_structure_get_warehouse);
  if (1 == org_structure_get_warehouse.status) {
    if (0 == org_structure_get_warehouse.count) {
      warehouse_payment_detail_work_area_data = {};
    } else {
      var warehouse_arr = new Array();
      var result = JSON.parse(org_structure_get_warehouse.result); 
      for (var i = 0; i < result.length; i++) {
        warehouse_arr.push({"work_area_name":result[i].name, "work_area_uuid":result[i].uuid});
      }
      warehouse_payment_detail_work_area_data["data"] = warehouse_arr;
      //console.log(warehouse_payment_detail_work_area_data["data"]);
    }
  } else {
    alert("获取库区失败");
    return;
  } 
}


/**
 * 获取自运营企业
*/
function warehouse_payment_detail_get_enterprise() {
  var get_enterprise_url = PROJECT_PATH + "lego/lego_crm?servletName=getEnterpriseInformation";
  var get_enterprise_param_data = {};
  get_enterprise_param_data["type"] = "1";
  var get_enterprise = ajax_assistant(get_enterprise_url, get_enterprise_param_data, false, true, false);
  if(1 == get_enterprise.status) {
    var result = JSON.parse(get_enterprise.result);
    console.log(result);
    enterprise_uuid_list = new Array();
    for (var i = 0; i < result.length; i++) {
      enterprise_uuid_list.push({
        "uuid": result[i].uuid,
      });
    }
  } else {
    alert("企业信息获取失败");
  }
}

/**
 * 获取合同
*/
function warehouse_payment_detail_get_contract(warehouse_uuid, start_sign_datetime, end_sign_datetime) {
  var get_contract_url = PROJECT_PATH + "lego/lego_fjTrade?servletName=getContractTrade";
  var get_contract_param_data = {};
  get_contract_param_data["warehouse_uuid"] = warehouse_uuid;
  get_contract_param_data["start_sign_datetime"] = start_sign_datetime;
  get_contract_param_data["end_sign_datetime"] = end_sign_datetime;
  var get_contract = ajax_assistant(get_contract_url, get_contract_param_data, false, true, false);
  if(1 == get_contract.status) {
    var result = JSON.parse(get_contract.result);
    console.log(result);
    for (var i = 0; i < result.length; i++) {
      contract_list.push({
        "buyer_uuid": result[i].buyer_uuid,
        "seller_uuid": result[i].seller_uuid,
        "total": (result[i].price * result[i].quantity),
        "uuid": result[i].uuid,
        "type": result[i].type,
        "sign_datetime": result[i].sign_datetime
      });
    }
  } else {
    alert("合同获取失败");
  }
}

/** 
 * 根据uuid获取合同信息
*/
function warehouse_payment_detail_get_contract_info(uuid) {
  for (var i = 0; i < contract_list.length; i++) {
    if (uuid == contract_list[i].uuid) {
      return contract_list[i];
    }
  }
}

/*
 * 开始计算数据
*/
function calc_data(loan_capital, start_sign_datetime, end_sign_datetime) {
  warehouse_payment_detail_data = new Array();
  for (var i = new Date(start_sign_datetime); i < new Date(end_sign_datetime); i.setDate(i.getDate() + 1)) {
    var sign_datetime = i.getFullYear() + '-' + (i.getMonth() + 1) + '-' + i.getDate();
    warehouse_payment_detail_data.push({
      "sign_datetime": sign_datetime,
      "payment": 0,
      "receipt": 0,
      "capital_occupying": 0,
      "interest": 0           
    })  
  }
  var enterprise_contract = new Array();
  //获取自营企业合同
  for (var i = 0; i < contract_list.length; i++) {
    for (var j = 0; j < enterprise_uuid_list.length; j++) {
      //采购合同
      if (contract_list[i].buyer_uuid == enterprise_uuid_list[j].uuid) {
        enterprise_contract.push({
         "uuid": contract_list[i].uuid
        });      
        break;
      }
      if (contract_list[i].seller_uuid == enterprise_uuid_list[j].uuid){
        enterprise_contract.push({
         "uuid": contract_list[i].uuid
        });      
        break;
      }
    } 
  }
  console.log(enterprise_contract);
  for (var i = 0; i < warehouse_payment_detail_data.length; i++) {
    for (var j = 0; j < enterprise_contract.length; j++) {
      var sign_datetime = new Date(warehouse_payment_detail_data[i].sign_datetime);
      var sign_datetime_server = new Date(warehouse_payment_detail_get_contract_info(enterprise_contract[j].uuid).sign_datetime);
      if (sign_datetime.getFullYear() == sign_datetime_server.getFullYear() && sign_datetime.getMonth()+1 == sign_datetime_server.getMonth()+1 && sign_datetime.getDate() == sign_datetime_server.getDate()) {
        //采购
        if (0 == warehouse_payment_detail_get_contract_info(enterprise_contract[j].uuid).type) {
          warehouse_payment_detail_data[i]["payment"] += warehouse_payment_detail_get_contract_info(enterprise_contract[j].uuid).total;
          break;
        }
        //销售
        if (1 == warehouse_payment_detail_get_contract_info(enterprise_contract[j].uuid).type) {
          warehouse_payment_detail_data[i]["receipt"] += warehouse_payment_detail_get_contract_info(enterprise_contract[j].uuid).total;
          break;
        }
      } 
    }
  }
  //计算余额和利息
  for (var i = 0; i < warehouse_payment_detail_data.length; i++) {
    if (0 == i) {
      warehouse_payment_detail_data[i]["capital_occupying"] = loan_capital;
    } else {
      warehouse_payment_detail_data[i]["capital_occupying"] = new Number((warehouse_payment_detail_data[i - 1]["capital_occupying"] + warehouse_payment_detail_data[i]["receipt"] - warehouse_payment_detail_data[i]["payment"]).toFixed(2));
    }
    warehouse_payment_detail_data[i]["interest"] = new Number((warehouse_payment_detail_data[i]["capital_occupying"] * 0.1 / 12 / 30).toFixed(2));
  }

}

/**
 * 合同明细输出
 * @param  output_id
 */
function warehouse_payment_detail_content(output_id) {
  var content = 
'      <div class = "panel panel-default panel-primary">'+
'        <div class = "panel-heading">搜索条件</div>'+
'        <div class = "panel-body" style="padding-bottom: 0;">'+
'          <div class = "row">'+
'            <div class="col-md-10">'+
'              <div class="row">'+
'               <div class = "col-md-6">'+
'                  <div class="input-group">'+
'                    <span class="input-group-addon">原始贷款资金</span>'+
'                    <input type="text" class="form-control" id = "warehouse_payment_detail_loan_capital" value = "91260059.73" aria-label="Amount (to the nearest dollar)">'+
'                    <span class="input-group-addon">元</span>'+
'                  </div>'+
'                </div>'+
'                <div class = "col-md-6">'+
'                  <div class="input-group pull-left">'+
'                    <span class="input-group-addon" id="">选择库区</span>'+
'                    <select class="form-control" id="warehouse_payment_detail_warehouse">'+
'                      <option class="">--请选择--</option>'+
'                      <option value="1">库区1</option>'+
'                      <option value="2">库区2</option>'+
'                      <option value="3">库区3</option>'+
'                    </select>'+
'                  </div>'+
'                </div>'+
'              </div>'+
'             <div class="row warehouse_payment_detail_mt15">'+
'               <div class = "col-md-6">'+
'                  <div class="input-group">'+
'                    <span class="input-group-addon">开始时间</span>'+
'                    <input type="text" class="form-control widget_datepicker" id = "warehouse_payment_detail_start_sign_datetime" value = "" aria-label="Amount (to the nearest dollar)">'+
'                    <span class="glyphicon glyphicon-calendar form-control-feedback" aria-hidden="true"></span>'+
'                  </div>'+
'                </div>'+
'                <div class = "col-md-6">'+
'                  <div class="input-group">'+
'                    <span class="input-group-addon">结束时间</span>'+
'                    <input type="text" class="form-control widget_datepicker" id = "warehouse_payment_detail_end_sign_datetime" value = "" aria-label="Amount (to the nearest dollar)">'+
'                    <span class="glyphicon glyphicon-calendar form-control-feedback" aria-hidden="true"></span>'+
'                  </div>'+
'                </div>'+
'             </div>'+
'            </div>'+
'            <div class="col-md-2">'+
'             <button class="btn btn-primary" type="button" id = "warehouse_payment_detail_search">                      '+
'                <span class="">搜索</span>                    '+
'              </button>   '+
'            </div>'+
'          </div>'+
'        </div>'+
'      </div>'+
'      <div class = "panel panel-default panel-primary">'+
'        <div class = "panel-heading text-left">明细记录</div>'+
'        <div class = "panel-body warehouse_payment_detail_pb0">'+
'          <div class = "col-md-12">'+
'            <table  class = "table warehouse_payment_detail_mt20" id = "warehouse_payment_detail_list">'+
'              <thead>'+
'                <tr>'+
'                  <th>日期</th>'+
'                  <th>收款</th>'+
'                  <th>付款</th>'+
'                  <th>占用资金</th>'+
'                  <th>资金利息</th>'+
'                </tr>'+
'              </thead>'+
'              <tbody id = "warehouse_payment_detail_list_box">'+
'                <tr>'+
'                  <td>2017-02-02</td>'+
'                  <td>2000000</td>'+
'                  <td>2000000</td>'+
'                  <td>2000000</td>'+
'                  <td>2000000</td>'+
'                </tr>'+
'              </tbody>'+
'            </table>'+
'          </div>'+
'        </div>'+
'      </div>';
  $(output_id).html(content);
}
