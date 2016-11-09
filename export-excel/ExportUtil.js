(function(){
	var EXCEL_CONTENTTYPE = "application/vnd.ms-excel;",
		EXCEL_URI = 'data:application/vnd.ms-excel;base64,',
		EXCE_TEMPLATE = '<html><head><meta charset="UTF-8"></head><body>{html}</body></html>',
		__PREVFIX = "\uFEFF",
		ieVersion = window.navigator.userAgent.toLowerCase().match(/(msie\s|trident.*rv:)([\w.]+)/),
		useIE = ieVersion && ieVersion[2] < 10,
		isIE1011 = ieVersion && ieVersion[2] > 9;

	var Export = {
		/*
		 *@param datas Two-dimensional array : datas, export only with data
					   or String : DOM id, export html content
	     *@param fileName export file name
		 */
		toExcel: function(datas, fName){
			var isId = typeof datas === 'string';
			if(isId || datas instanceof Array){
				if(useIE || isId && isIE1011){
					Export.__ieExport(datas);
				} else{
					Export.__oTherExport(datas, fName);
				}			
			} else{
				alert("datas params need Two-dimensional array or String.");
			}
		},
		__ieExport : function(datas){
		    
  		    var oXL = new ActiveXObject("Excel.Application"), 
                oWB = oXL.Workbooks.Add(),
                oSheet = oWB.ActiveSheet,
				i = 0, 
				j;  

			if(typeof datas === 'string'){

				var elem = document.getElementById(datas);  
			    var sel = document.body.createTextRange();  
				sel.moveToElementText(elem);  
				try{
					sel.select();  //there ie10、11 will be error, i don't know why, but also can export 
				} catch(e){}
				sel.execCommand("Copy");  
				oSheet.Paste();
			} else {
				for(; i < datas.length; i++){   
					var row = datas[i];  
					for (j = 0; j < row.length; j++) {  
						oSheet.Cells(i + 1, j + 1).value = row[j];  
	  
					}    
				}  			
			}   
            oXL.Visible = true;  		
		},
		__oTherExport : function(datas, fileName){
							
			if(typeof datas === 'string'){

				var elem = document.getElementById(datas),
					content = EXCE_TEMPLATE.replace("{html}", elem.outerHTML);
				//TODO: need test large amount of data
				window.location.href = EXCEL_URI + 	window.btoa(unescape(encodeURIComponent(content)));				
			} else {
				var blob,
					i = 0, 
					j,
					str = __PREVFIX;  

				for(; i < datas.length; i++){   
					var row = datas[i];  
					// the value add double quotation marks on both sides, for separate values. 
					str += "\""+ row.join("\",\"") + "\"\n";  
				}  
				//on safari:  TypeError: '[object BlobConstructor]' is not a constructor (evaluating 'new Blob([str],{
				//import Blob.js to fix, but still have a problem : the fileName will be 'Unknown' , but if you add suffix name, content can be seen.
				blob = new Blob([str],{
					type: EXCEL_CONTENTTYPE
				});
				saveAs(blob, fileName || "Download.xls");	
			}
		}	
	}

	window.ExportUtil = Export;
})();