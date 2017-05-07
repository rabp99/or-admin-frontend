'use strict';

/**
 * @ngdoc function
 * @name tuplastAdminApp.controller:ClientesAddCtrl
 * @description
 * # ClientesAddCtrl
 * Controller of the tuplastAdminApp
 */
angular.module('tuplastAdminApp')
.controller('ClientesAddCtrl', function ($scope, $uibModalInstance, ClientesService) {
    $scope.cliente = {};
    $scope.tmp_path = angular.module('tuplastAdminApp').path_location + 'tmp'; 
    $scope.loading = false;
        
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveCliente = function(cliente, boton, url_preview) {
        $('#' + boton).text('Guardando...');
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        
        if (url_preview === null) {
            alert('Seleccione una imagen correcta');
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            return;
        }
        cliente.url = url_preview;
        ClientesService.save(cliente, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close(data);
        }, function(data) {
            $('#' + boton).removeClass('disabled');
            $('#' + boton).prop('disabled', false);
            $uibModalInstance.close({
                message: {
                    type: 'error',
                    text: 'Hubo un error. Código: ' + data.status + ' Mensaje: ' + data.statusText
                }
            });
        });
    };
    
    $scope.preview = function(image, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', image);
        
        ClientesService.preview(fd, function(data) {
            if (data.message.type === 'success') {
                $scope.url_preview = data.filename;
            } else if (data.message.type === 'error') {
                $scope.url_preview = null;
            }
            $scope.loading = false;
        }, function(data) {
            $scope.url_preview = null;
            $scope.loading = false;
        });
    };
});