'use strict';

/**
 * @ngdoc function
 * @name tuplastAdminApp.controller:PagesEditCtrl
 * @description
 * # PagesEditCtrl
 * Controller of the tuplastAdminApp
 */
angular.module('tuplastAdminApp')
.controller('PagesEditCtrl', function ($scope, page, $uibModalInstance, PagesService) {
    $scope.page = $.extend(true, {}, page);
    $scope.tmp_path = angular.module('tuplastAdminApp').path_location + 'img' + '/paginas/'; 
    $scope.menus = [
        {id: 'NS', description: 'Nosotros'},
        {id: 'PY', description: 'Proyectos'}, 
        {id: 'CN', description: 'Contáctanos'}
    ];
    
    $scope.tinymcePagesOptions = {
        plugins: 'lists image',
        file_browser_callback_types: 'image',
        file_browser_callback: function(field_name, url, type, win) {
            $scope.input = field_name;
            $('#flImagen').click();
        }
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.savePage = function(page, boton) {
        $('#' + boton).text('Guardando...');
        $('#' + boton).addClass('disabled');
        $('#' + boton).prop('disabled', true);
        
        PagesService.save(page, function(data) {
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
    
    $scope.upload = function(image, errFiles) {
        var fd = new FormData();
        fd.append('file', image);
        
        PagesService.upload(fd, function(data) {
            $scope.url = $scope.tmp_path + data.filename;
            document.getElementById($scope.input).value = $scope.url;
        });
    };
});