/*! jzShutter - RAiww. MIT @license: ra.iww.twbbs.org/ffish/MIT_License. */

"use strict";
exports._jzY = 'jzReturn-log';
exports._PVN = [ '百葉窗', 'jzShutter', 'v0.0.0' ];

exports.program = jzShutter;

function jzShutter(){
    let i = {};
    
    i.shutter = function(){
        function jClone( ObjMain, ObjInf ){
            for( let jTitle in ObjInf )
                ObjMain[ jTitle ] = ObjInf[ jTitle ];
        }
        jClone( ion_move, ion_factory.move );
        jClone( ion_vision, ion_factory.vision );
        jClone( ion_cue, ion_factory.cue );
        
        let HElemQS_shutter = document.querySelectorAll('[data-jz-shutter]');
        for( let len = HElemQS_shutter.length, p = 0 ; p < len ; p++ ){
            let HElemMain = HElemQS_shutter[ p ];
            ion_shutter( HElemMain );
            ion_clear( HElemMain );
        }
        
        delete this.shutter;
        ion_shutter = ion_clear = ion_move = ion_vision = ion_cue = null;
    };
    
    let ion_factory = { move: {}, vision: {}, cue: {} };
    i.shutter.move = ion_factory.move;
    i.shutter.vision = ion_factory.vision;
    i.shutter.cue = ion_factory.cue;
    
    function ion_clear( HElemMain ){
        let Arr = [ 'jz-shutter', 'jzy-cue', 'jzy-movefunc', 'jzy-speed' ];
        for( let p = 0 ; p < 4 ; p++ )
            HElemMain.removeAttribute( 'data-' + Arr[ p ] );
    }
    
    function ion_shutter( HElemMain ){
        let jVisionFuncName = HElemMain.dataset['jzShutter'],
            HElemVision = HElemMain.querySelector('.cJzVision'),
            jCueFuncName = HElemMain.dataset['jzyCue'];
        
        //不允許無主框或主框動畫
        if( !HElemVision || !( jVisionFuncName in ion_vision ) ) return;
        
        let jStyle_HElemMain = getComputedStyle( HElemMain ),
            //可用的參數
            jArgu = {
                HElemMain: HElemMain,
                HElemVision: HElemVision,
                HElemCue: HElemMain.querySelector('.cJzCue') || null,
                mainSize: {
                    width: parseInt( jStyle_HElemMain.width ),
                    height: parseInt( jStyle_HElemMain.height ),
                },
                lengthChild: HElemVision.children.length,
                moveFunc: [],
                //當前輪播項目
                order: 0,
                speed: ion_shutter.getSpeedNum( HElemMain.dataset['jzySpeed'] ),
                timer: []
            };
        
        //vision 主視覺函數
        HElemMain.classList.add('cJzShutter');
        
        //vision 主視覺函數
        jArgu.HElemVision.classList.add( 'es' + ion_shutter.toWordFirstUpperCase( jVisionFuncName ) );
        ion_vision[ jVisionFuncName ]( jArgu );
        
        //Cue 提示點函數
        jArgu.HElemCue.classList.add( 'es' + ion_shutter.toWordFirstUpperCase( jCueFuncName ) );
        if( jCueFuncName in ion_cue )
            ion_cue[ jCueFuncName ]( jArgu );
        
        //執行計時器
        ion_timer.bind( jArgu );
    }
    
    ion_shutter.toWordFirstUpperCase = function( Str ){
        return Str.replace( /^./, function( Str ){ return Str.toLocaleUpperCase() } );
    };
    
    ion_shutter.getSpeedNum = function( Str ){
        let ArrSpeed = !Str || Str.match( /^(\d+)ms +(\d+)ms$/ );
        if( !ArrSpeed || ArrSpeed.length !== 3 )
            return [ 600, 3000 ];
        
        ArrSpeed.shift();
        return ArrSpeed;
    };
    
    function ion_actMoveFunc( jArgu, jIndex ){
        for( let p = 0; p < jArgu.moveFunc.length ; p++ )
            jArgu.moveFunc[ p ]( jArgu, jIndex );
        jArgu.order = jIndex;
    }
    
    let ion_timer = {
            bind: function( jArgu ){
                for( let p = 0; p < jArgu.timer.length ; p++ )
                    jArgu.timer[ p ].event = setInterval(
                        jArgu.timer[ p ].func,
                        jArgu.speed[1]
                    );
            },
            stop: function( jArgu ){
                for( let p = 0; p < jArgu.timer.length ; p++ ){
                    clearInterval( jArgu.timer[ p ].event );
                    jArgu.timer[ p ].event = null;
                }
            }
        };
    
    let ion_move = {}, ion_vision = {}, ion_cue = {};
    
    
//>> 移動方法函數 -----
    
    
//>> 主框布置 -----
    
    
//>> 選框布置 -----
    
    
    return i;
}