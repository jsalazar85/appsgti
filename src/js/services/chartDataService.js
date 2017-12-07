/**
 * Created by DiHG on 01/10/17.
 */
angular
    .module('RDash')
    .service('chartDataService',[
        '$interval',
        'toolsService',
        '$http',
        '$q',
        function($interval,tools,$http,$q) {
            var lstWorkTask=[]; //Contiene las tareas en forma de lista
            var lstWorkList=[]; //Contiene la lista de tareas y su agrupación
            var workList={};

            //TODO: Poner un object template para el tipo de los tasks

            //name='Nombre de la tarea'
            //obj=objeto que cuenta con los parámetros correctos para hacer la llamada
            this.addWorkTask=function(name,obj){
                lstWorkTask.push({name:name,task:obj});
            };

            //Recibe una array de nombres que se ejecutarán como una unidad
            this.addWorkList=function (txListName, txWorkTaskName) {

                if(_.isEmpty(workList[txListName])){
                    workList[txListName]=[];
                    workList[txListName].push(txWorkTaskName);
                }else{
                    workList[txListName].push(txWorkTaskName);
                }
            };

            this.cleanWorkList=function (txListName) {
                workList[txListName]=[];
            };

            //Obtiene un solo objeto tarea por el nombre
            this.getWorkTask=function (txWorkTaskName) {
                var res=null;

                for(var i in lstWorkTask){
                    if( lstWorkTask[i].name == txWorkTaskName){
                        res=lstWorkTask[i];
                    }
                }

                return res;
            };

            this.doWorkTask=function(txWorkTaskName){
                //Get task name
                var workTask=this.getWorkTask(txWorkTaskName);

                if(angular.isDefined(workTask)){
                    $http({
                        url:workTask.task.url,
                        method:'POST',
                        dataType:'json',
                        data:{data:JSON.stringify({idQuery:workTask.task.query})},
                        //data: JSON.stringify ( {dataobject:{testob:"test"}} ),
                        transformRequest: function(obj) {
                            var str = [];
                            for(var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'Accept':'application/json, text/javascript, */*; q=0.01'
                        }
                    }).then(function(response){
                        //deferred.resolve(response.data);
                        if(angular.isDefined(workTask.task.success)){
                            workTask.task.success(response.data);
                        }else{
                            console.log("[chartDataService].[doWorkTask] Success function not defined");
                        }
                    },function(response,error){
                        //deferred.resolve(response.data);
                        if(angular.isDefined(workTask.task.success)){
                            workTask.task.fail(response,error);
                        }else{
                            console.log("[chartDataService].[doWorkTask] Fail function not defined");
                        }
                    });
                } else{
                    console.log("[chartDataService] No se encontró el nombre de la tarea;");
                }

            };

            this.doWorkList=function(txListName){
                console.log(txListName);
                console.log(workList);
                //Obtener el array que tiene la lista de objetos
                var lstWorkList=null;
                var txWorkTaskName="";
                if(!_.isEmpty(workList[txListName])){
                    lstWorkList=workList[txListName];
                }else{
                    return;
                }

                //Iterar por todas las peticinoes
                var workTask=null;
                var lstPetitions=[];
                for(var i in lstWorkList){
                    txWorkTaskName=lstWorkList[i];
                    workTask=this.getWorkTask(txWorkTaskName);

                    lstPetitions.push(
                        $http({
                            url:workTask.task.url,
                            method:'POST',
                            dataType:'json',
                            data:{data:JSON.stringify({idQuery:workTask.task.query})},
                            //data: JSON.stringify ( {dataobject:{testob:"test"}} ),
                            transformRequest: function(obj) {
                                var str = [];
                                for(var p in obj)
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                return str.join("&");
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                'Accept':'application/json, text/javascript, */*; q=0.01'
                            }
                        })
                    );
                };

                //Ejecutar las promesas
                var that=this;
                $q.all(lstPetitions).then(function(results){
                    for(var i in results){
                        txWorkTaskName=lstWorkList[i];
                        workTask=that.getWorkTask(txWorkTaskName);
                        workTask.task.success(results[i]);
                    }
                });
            };



        }]);
