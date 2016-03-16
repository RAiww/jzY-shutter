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
        let Arr = [ 'jz-shutter', 'jzy-cue', 'jzy-movefunc', 'jzy-speed', 'jzy-anim' ];
        for( let p = 0 ; p < 5 ; p++ )
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
                anim: HElemMain.dataset['jzyAnim'],
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
        ion_shutter.firstTimer( jArgu );
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
    
    ion_shutter.firstTimer = function( jArgu ){
        let jAnimActTimes = 1;
        switch( jArgu.anim ){
            case 'false': jArgu.timer.length = 0; break;
            case 'once':
                for( let p = 0; p < jArgu.timer.length ; p++ ){
                    jArgu.timer[ p ].event = setInterval( function(){
                        jArgu.timer[ p ].func();
                        if( jAnimActTimes < jArgu.lengthChild )
                            jAnimActTimes++;
                        else{
                            ion_timer.stop( jArgu );
                            jArgu.timer.length = 0;
                        }
                    }, jArgu.speed[1] );
                }
                break;
            default:
                jArgu.anim = true;
                ion_timer.bind( jArgu );
        }
    };
    
    function ion_actMoveFunc( jArgu, jIndex ){
        for( let p = 0; p < jArgu.moveFunc.length ; p++ )
            jArgu.moveFunc[ p ]( jArgu, jIndex );
        jArgu.order = jIndex;
    }
    
    let ion_timer = {
            bind: function( jArgu ){
                if( jArgu.anim !== true ) return;
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
    
    ion_move.slideLine = function( jArgu, jIndex ){
        let Num = -1 * jArgu.mainSize.width * jIndex;
        jArgu.HElemVision.style.transitionDuration = jArgu.speed[0] + 'ms';
        jArgu.HElemVision.style.left = Num + 'px';
        setTimeout( function(){
            jArgu.HElemVision.style.transitionDuration = '0ms';
        }, jArgu.speed[0] );
    };
    
    
//>> 主框布置 -----
    
    ion_vision.slideLine = function( jArgu ){
        jArgu.HElemVision.style.width = ( jArgu.mainSize.width * jArgu.lengthChild ) + 'px';
        jArgu.HElemVision.style.height = jArgu.mainSize.height + 'px';
        
        let HElemVisionChilds = jArgu.HElemVision.children;
        for( let len = HElemVisionChilds.length ; len-- ; ){
            let HElemChild = HElemVisionChilds[ len ];
            HElemChild.style.width = jArgu.mainSize.width + 'px';
            HElemChild.style.height = jArgu.mainSize.height + 'px';
        }
        
        jArgu.moveFunc.push( ion_move.slideLine );
        jArgu.timer.push({ func: function(){
            let jIndex = jArgu.order + 1;
            ion_actMoveFunc( jArgu, jIndex < jArgu.lengthChild ? jIndex : 0 );
        } });
        
        let jPlace = {
                totallLength: jArgu.mainSize.width * jArgu.lengthChild,
                limitMoveLength: jArgu.mainSize.width * 0.3,
                validLength: jArgu.mainSize.width > 640 ? 100 : jArgu.mainSize.width * 0.16
            };
        jz.qs( jArgu.HElemVision ).onMultiMouseMove({
            start: function( evt ){
                ion_timer.stop( jArgu );
                jPlace.start = jArgu.mainSize.width * jArgu.order;
                jPlace.mouseX = evt.pageX;
            },
            move: function( evt, jType, evtOrig ){
                let jMoveRange = evt.pageX - jPlace.mouseX,
                    jMoveRange_abs = Math.abs( jMoveRange );
                if( jMoveRange_abs > jPlace.limitMoveLength )
                    jMoveRange = ( jMoveRange / jMoveRange_abs )
                        * ( jPlace.limitMoveLength * 0.76 + jMoveRange_abs * 0.23 );
                
                jArgu.HElemVision.style.left = -1 * ( jPlace.start - jMoveRange ) + 'px';
                evt.stopPropagation();
                evt.preventDefault();
            },
            end: function( evt ){
                let n = Math.abs( evt.pageX - jPlace.mouseX ) > jPlace.validLength ?
                            evt.pageX - jPlace.mouseX > 0 ? -1 : 1 : 0;
                let jIndex = jArgu.order + n;
                jIndex = jIndex < jArgu.lengthChild ?
                            jIndex < 0 ? 0 : jIndex : jArgu.lengthChild - 1;
                ion_actMoveFunc( jArgu, jIndex );
                ion_timer.bind( jArgu );
            }
        });
    };
    
    
//>> 選框布置 -----
    
    ion_cue.initial = function( jArgu ){
        for( let p = 0 ; p < jArgu.lengthChild ; p++ )
            jArgu.HElemCue.children[ p ].addEventListener( 'click', function(){
                ion_timer.stop( jArgu );
                ion_actMoveFunc( jArgu, p );
                ion_timer.bind( jArgu );
            }, false );
    };
    
    ion_cue.point = function( jArgu ){
        let StrCueTagI = '';
        for( let p = 0 ; p < jArgu.lengthChild ; p++ )
            StrCueTagI += '<i></i>';
        jArgu.HElemCue.innerHTML = StrCueTagI;
        ion_cue.initial( jArgu );
    };
    
    
    return i;
}