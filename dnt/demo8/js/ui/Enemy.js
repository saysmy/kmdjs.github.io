﻿define(["ui/HeadHPBar","ui/SelectedAnm"],function(n,t){function i(n,t,i,r,u,f,e,o){this.initialize(n,t,i,r,u,f,e,o)}return i.prototype=new CJ.Container,i.prototype.Container_initialize=i.prototype.initialize,i.prototype.initialize=function(i,r,u,f,e,o,s,h){var l,a,c;this.Container_initialize(),this.EXP=e,this.wakeAreaRadius=s,this.sleepAreaRadius=h,this.name=i,this.position=r,this.speed=o,this.realSpeed=o,this.prePositionX=-1,this.prePositionY=-1,this.preViewPortX=Global.player.viewPort[0],this.preViewPortY=Global.player.viewPort[1],this.currentCell=Global.map.getSmallCellIndex(this.position),this.selectedAnm=new t,this.selectedAnm.visible=!1,this.addChild(this.selectedAnm),l=_.chain(Global.resCache).filter(function(n){return n.key==i}).first().value(),l?this.bmpAnim=l.value.clone():(a=new CJ.SpriteSheet({images:[Resource.getRes(i)],frames:Resource.getFrames(i),animations:{stand0:[0,2,"stand0",10],walk0:[3,8,"walk0",4],attack0:[9,13,"attack0",10],hurt0:{frames:[14,14],next:"stand0",frequency:8},die0:[14,16,"",3],stand1:[17,19,"stand1",10],walk1:[20,25,"walk1",4],attack1:[26,30,"attack1",10],hurt1:{frames:[31,31],next:"stand1",frequency:8},die1:[31,33,"",3],stand2:[34,36,"stand2",10],walk2:[37,42,"walk2",4],attack2:[43,47,"attack2",10],hurt2:{frames:[48,48],next:"stand2",frequency:8},die2:[48,50,"",3],stand3:[51,53,"stand3",10],walk3:[54,59,"walk3",4],attack3:[60,64,"attack3",10],hurt3:{frames:[65,65],next:"stand3",frequency:8},die3:[65,67,"",3],stand4:[68,70,"stand4",10],walk4:[71,76,"walk4",4],attack4:[77,81,"attack4",10],hurt4:{frames:[82,82],next:"stand4",frequency:8},die4:[82,84,"",3]}}),CJ.SpriteSheetUtils.addFlippedFrames(a,!0,!1,!1),this.bmpAnim=new CJ.BitmapAnimation(a),Global.resCache.push({key:i,value:this.bmpAnim})),this.bmpAnim.y=10,this.direction=MathHelp.getRandomNumber(0,7),this.bmpAnim.gotoAndPlay("stand"+this.getFrameName()),this.addChild(this.bmpAnim),this.path=[],this.height=90,this.HP=u,this.totalHP=u,this.MP=f,this.totalMP=f,this.disappearIng=!1,this.headHPBar=new n(this,40,5),this.addChild(this.headHPBar),c=this,this.onMouseOver=function(){if(c.HP>0){for(var n=0;n<Global.PGCTT.children.length;n++)Global.PGCTT.children[n].selectedAnm&&(Global.PGCTT.children[n].selectedAnm.visible=!1);this.selectedAnm.visible=!0,Global.player.target=c}},this.onClick=function(){if(c.HP>0){for(var n=0;n<Global.PGCTT.children.length;n++)Global.PGCTT.children[n].selectedAnm&&(Global.PGCTT.children[n].selectedAnm.visible=!1);this.selectedAnm.visible=!0,Global.player.target=c}},this.bmpAnim.onAnimationEnd=function(){c.bmpAnim.currentAnimation.indexOf("attack")!==-1&&(SoundJS.play("cut",SoundJS.INTERRUPT_ANY),c.target.subHP(MathHelp.getRandomNumber(3,200)),MathHelp.isInSurround(c.target.currentCell,c.currentCell)&&c.position.x%60==30&&c.position.y%30==15?c.attack():c.walk())},this.setAlpha(),Global.enemyArr.push(this)},i.prototype.setAlpha=function(){this.alpha=_.include(Global.map.mask,this.currentCell.x+"_"+this.currentCell.y)?.5:1},i.prototype.tick=function(){var n,t;if(this.speed=parseInt(this.realSpeed*60/CJ.Ticker.getMeasuredFPS()),this.setStagePosition(),n=this,this.HP<=0){this.target&&this.EXP>0&&this.target.addExp(this.EXP),this.EXP=0,this.die(),this.removeChild(this.headHPBar),this.removeChild(this.selectedAnm),this.disappearIng||(this.disappearIng=!0,CJ.Tween.get(this).wait(2e3).to({alpha:0},4e3).call(function(){CJ.Ticker.removeListener(this),this.parent.removeChild(this),Global.enemyArr.splice(Global.enemyArr.indexOf(n),1)}));return}t=Global.player.position.distanceToSquared(this.position),this.target?this.bmpAnim.currentAnimation.indexOf("attack")===-1?MathHelp.isInSurround(this.target.currentCell,this.currentCell)&&this.position.x%60==30&&this.position.y%30==15?(this.setDirection(this.target.currentCell),this.attack()):this.bmpAnim.currentAnimation.indexOf("hurt")===-1&&(this.targetCell?this.moveTo():this.targetCell=this.getTargetCell()):this.setDirection(this.target.currentCell):(this.bmpAnim.currentAnimation.indexOf("hurt")===-1&&this.stand(),t<this.wakeAreaRadius*this.wakeAreaRadius&&(this.target=Global.player))},i.prototype.moveTo=function(){var n=Global.map.getPositionBySmallCellIndex(this.targetCell),t=n.sub(this.position).setLength(this.speed);this.position.x+=t.x,this.position.y+=t.y,this.setDirection(this.targetCell),this.currentCell=Global.map.getSmallCellIndex(this.position),(this.position.distanceToSquared(n)<parseInt(1500/CJ.Ticker.getMeasuredFPS())||t.x===0&&t.y===0)&&(this.position.x=n.x,this.position.y=n.y,this.targetCell=null),this.walk()},i.prototype.setDirection=function(n){var t=n.x-this.currentCell.x,i=n.y-this.currentCell.y;t===0&&i<0&&(this.direction=0),t>0&&i<0&&(this.direction=1),t>0&&i===0&&(this.direction=2),t>0&&i>0&&(this.direction=3),t===0&&i>0&&(this.direction=4),t<0&&i>0&&(this.direction=5),t<0&&i===0&&(this.direction=6),t<0&&i<0&&(this.direction=7)},i.prototype.getFrameName=function(){return this.direction==0?"0":this.direction==1?"1":this.direction==2?"2":this.direction==3?"3":this.direction==4?"4":this.direction==5?"3_h":this.direction==6?"2_h":this.direction==7?"1_h":void 0},i.prototype.stand=function(){this.bmpAnim.currentAnimation!="stand"+this.getFrameName()&&this.bmpAnim.gotoAndPlay("stand"+this.getFrameName())},i.prototype.walk=function(){this.bmpAnim.currentAnimation!="walk"+this.getFrameName()&&this.bmpAnim.gotoAndPlay("walk"+this.getFrameName())},i.prototype.attack=function(){this.bmpAnim.currentAnimation!="attack"+this.getFrameName()&&this.bmpAnim.gotoAndPlay("attack"+this.getFrameName())},i.prototype.die=function(){this.bmpAnim.currentAnimation!="die"+this.getFrameName()&&this.bmpAnim.gotoAndPlay("die"+this.getFrameName())},i.prototype.hurt=function(){this.bmpAnim.currentAnimation!="hurt"+this.getFrameName()&&this.bmpAnim.gotoAndPlay("hurt"+this.getFrameName())},i.prototype.setStagePosition=function(){if((this.preViewPortX!==Global.player.viewPort[0]||this.preViewPortY!==Global.player.viewPort[1])&&(this.x+=this.preViewPortX-Global.player.viewPort[0],this.y+=this.preViewPortY-Global.player.viewPort[1],this.preViewPortX=Global.player.viewPort[0],this.preViewPortY=Global.player.viewPort[1]),this.prePositionX!==this.position.x||this.prePositionY!==this.position.y){var n=Global.worldToStage(this.position);this.x=parseInt(n.x),this.y=parseInt(n.y),this.prePositionX=this.position.x,this.prePositionY=this.position.y,this.setAlpha()}},i.prototype.getTargetCell=function(){var p=this,e=_.chain(Global.enemyArr).filter(function(n){return n.target&&n.id!=p.id&&n.HP>0}).value(),w=Global.map.getSmallCellIndex(this.position),n=MathHelp.getCellSurround(w),c=Global.map.isCellInObstruction(n[0].x,n[0].y),l=Global.map.isCellInObstruction(n[2].x,n[2].y),a=Global.map.isCellInObstruction(n[4].x,n[4].y),v=Global.map.isCellInObstruction(n[6].x,n[6].y),u,i,f,t,o,r,y,s,h;for(c&&l&&n.splice(1,1),l&&a&&n.splice(-5+n.length,1),a&&v&&n.splice(-3+n.length,1),v&&c&&n.splice(-1+n.length,1),i=0;i<n.length;i++)Global.map.isCellInObstruction(n[i].x,n[i].y)&&n.splice(i--,1);for(u=MathHelp.getCellSurround(this.target.currentCell),i=0;i<u.length;i++)Global.map.isCellInObstruction(u[i].x,u[i].y)&&u.splice(i--,1);for(f=[],t=0;t<e.length;t++)e[t].bmpAnim.currentAnimation.indexOf("walk")==-1&&f.push(e[t].currentCell),e[t].targetCell&&f.push(e[t].targetCell);for(t=0;t<Global.players.length;t++)f.push(Global.players[t].currentCell),Global.players[t].targetCell&&f.push(Global.players[t].targetCell);for(o=[],r=0;r<n.length;r++)y=_.chain(f).filter(function(t){return t.x==n[r].x&&t.y==n[r].y}).value(),y.length==0&&(u.length===0?o.push({position:n[r],distanceSqu:this.target.currentCell.distanceToSquared(n[r])}):(s=MathHelp.randomItemFromArray(u),o.push({position:n[r],distanceSqu:new Vector2(s.x,s.y).distanceToSquared(n[r])})));return o.length>1&&(h=_.chain(o).sortBy(function(n){return n.distanceSqu}).first().value(),h)?h.position:null},i.prototype.getStagePosition=function(){return new Vector2(this.x,this.y)},i.prototype.subHP=function(n){this.HP-=n,this.updateHeadHPBar(),this.hurt();var t=new CJ.Text;n<10&&(t.regX=17),n>=10&&n<100&&(t.regX=25),n>=100&&(t.regX=35),t.y=-this.height,t.color="red",t.font="bold 20pt Calibri ",t.text="-"+n,this.addChild(t),CJ.Tween.get(t).to({alpha:0,y:t.y-80},1e3).call(function(){this.parent.removeChild(this)})},i.prototype.updateHeadHPBar=function(){this.headHPBar.setHP(this.HP)},i})