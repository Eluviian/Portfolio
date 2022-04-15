//=============================================================================
// RPG Maker MV
//=============================================================================
/*:
 * @plugindesc QJ-Bullet[V6.0] 2022-2-19
 * @author Qiu Jiu
 * 
 *
 * @help
 * ================================================================
 * I`m sorry that my English is very poor,so some sentences may not be very fluent.
 * ================================================================
 * 一.Plugin Notice  (projectiles/bullets)
 * ================================================================
 * 1.This plugin has a complete damage determination system, which can be used as the core plugin for 
 *   determining damage in ARPG/STG game or as the extension of other ABS plugins.
 *   And the plugin`s function of the particle and residual shadow effects can also be used to make 
 *   special effects.
 * 2.You need to place bullet image in "img/bullets" folder.
 * 3.The way of reducing calculation capacity is below:
 *   Set the 'CollisionBox' to circular instead of rectangular.
 *   Reduce the number of bullets that exist simultaneously in the same period of time.
 * 4.The system take some time to load the image.so if the projectile image is used for the first time,
 *   the appearance of bullet will be delayed for some time.
 *   You can just add the needed file`s name in the preload field,and the system will preload it automatically.
 * 5.The plugin is sold on itch.io.And you can get a preview version on itch.io.
 *   https://qiujiu.itch.io/qj-bullet-plugin
 *   If you want use it for uncommercial use ,you can contact me on discord.
 *   https://discord.gg/2Hyg8Vb7Jv
 *   It is not free for commercial use.
 * 6.The attribute name with * below can use special fade effects.
 *   Use ~ to separate the different change.
 *   The format of a change point is 'duration|target value' or 'duration/fade target value'.
 *   And the first change point is the initial value of the attribute.
 *   e.g:
 *       0|5~30|20~20/30:the initial value is 5, then it becomes 20 after 20 frames,finally it becomes 
 *       30 in 30 frames gradually(because of using /).
 *   The fade target value may also be color as #00FF00.
 *   You should use angle and system can convert it to radians automatically.
 *   The value changes will cycle.
 * 7.The content of DeadQT/MoveQT/UpdateQT or DeadJS/MoveJS/UpdateJS can contain below phrase:
 *   this.screenShowX()   refer to the x coordinate of bullet.
 *   this.screenShowY()   refer to the y coordinate of bullet.
 *   this.showRotation()   refer to the rotation of bullet image.
 *   this.showRotationMove()   refer to the rotation of bullet`s move.
 *   this.screenShowXLast(num)   refer to the 'num' from last X coordinate of the bullet.
 *   this.screenShowYLast(num)   refer to the 'num' from last Y coordinate of the bullet.
 *   You can use the above phrase in DeadQT/MoveQT/UpdateQT to make a new bullet in the old bullet`s
 *   position.
 * 8.You can write notes <Group:"group id"> in event`s page`s first order.
 *   Then those events can be added to a group.
 *   If the page change,the group of event may change base on new page`s first order.
 * 8.You can write notes <Group:"group id"> in event`s page`s first order.
 *   Then those events can be added to a group.
 *   If the page change,the group of event may change base on new page`s first order.
 * ================================================================
 * 二.Plugin Help
 * ================================================================
 * 1.Base way to shoot a bullet:
 *   every attribute has a default value.
 *
 *   QJ.BL.Shoot({
 *    attribute:value,
 *    attribute:value,
 *    attribute:value
 *   });
 *
 *   e.g:change the value of Aciotn and Anim.
 *
 *   QJ.BL.Shoot({
 *    Action:["SS[A,true]"],
 *    Anim:1
 *   });
 * ===============================================
 * The content of attribute:
 * ===============================================
 *      initialRotation:The default is "PD[]".The initial rotation of bullet.
 *          0-360 degree.0 refers to up,90 refers to right,180 refers to down,270 refers to left.
 *          You can also use:(the phrase such as "M[]+5","P[]-10/2" and "D[0]+5*5" is OK.)
 *          "M[]":Aim at the direction of mouse from (x,y) below.
 *          "PD[]":Same as the direction of player.
 *          "D[number]":Same as the direction of event.
 *          "P[]":Aim at the direction of player from (x,y) below.
 *          "E[event id]":Aim at the direction of event from (x,y) below.
 *          "EV[variable id]":Aim at the direction of event from (x,y) below.The event`s id is the value of variable.
 *          "X[xValue]Y[yValue]":Aim at (xValue,yValue) from (x,y) below. e.g:"X[100]Y[100]".
 *          "XM[variable1 id]YM[variable2 id]"Aim at (xValue,yValue) from (x,y) below.The xValue/yValue is 
 *              the value of variable1/variable2.
 *          "G[group id]":Aim at the nearest event from (x,y) below in the group.
 * ===============================================
 *      x/y:The default is"P[]"The initial x/y coordinate.
 *          "M[]":refer to x/y coordinate of mouse.
 *          "P[]":refer to x/y coordinate of player.
 *          "E[event id]":refer to x/y coordinate of event.0 refers to this event.
 *          "B[index]":refer to x/y coordinate of bullet.Every bullet has their own index.
 *              This phrase is used in DeadQT/MoveQT/UpdateQT/DeadJS/MoveJS/UpdateJS.
 *              Use this.index to get the old bullet`s x/y.
 *              Standard text is "B["+this.index+"]".
 *          Special phrase:
 *          "G[group id,orginX,orginY,MaxRange,num]":
 *              refer to the num(1st,2nd,3rd......) nearest event from (orginX,orginY) in the range of 'MaxRange' pixels
 *              in the special group.
 *              orginX/orginY can be M[]/P[]/E[event id].(can`t nest)
 *          "GR[group id]":refer to the random event in the special group.
 *          "GRR[group id,orginX,orginY,MaxRange]":
 *              refer to the random event from (orginX,orginY) in the range of 'MaxRange' pixels in the special group.
 *          !!!G,GR and GRR are opposed to each other!!!
 * ===============================================
 *      z:The default is"C[]".The z value of bullet.
 *           "T[]":The bullet image will show below map,player,event and picture.
 *           "M[]":The bullet image will show below player,event and picture above map.
 *           "C[]":The bullet image will show below picture above map,player and event.
 *           "P[]":The bullet image will show above map,player,event and picture.
 * ===============================================
 *      scaleX*:The default is 100.(%)
 * ===============================================
 *      scaleY*:The default is 100.(%)
 * ===============================================
 *      MoveType:The default is "S[]".The move type of bullet.
 *           mR = min Rotation angle per frame.
 *           "S[]":move Straight.
 *           "TP[mR]":trace Player.
 *           "TE[mR,event id]":trace event.
 *           "TEV[mR,variable id]":trace event whose id is variable.
 *           "TG[mR,group id]":trace the nearest event in group.
 *           "QP[min width,angle,min time,bounce times]":Quadratic parabola.
 *                  min width/min time:width/time of the last bounce.
 *                  Prefer to use function 'QJ.BL.Shooter_HandGrenade' directly.
 *           "B[character,
 *                  offset x down,offset y down,
 *                  offset x left,offset x left,
 *                  offset x right,offset x right,
 *                  offset x up,offset x up]":
 *                  The bullet will stick to the bullet.
 *                  character:-1 refer to player.the number greater than 0 refer to event.
 *                  default value is "B[-1,0,0,0,0,0,0,0,0]".
 *           "F[content]":use function to define the trail of bullet.
 *                  read 'the moveType of Particles' for more detail explain.
 *                  !The value ReBound,speed and so on of bullet will be uinvalid if you use this.
 * ===============================================
 *      rTRotation:The default is "".Special angle increase.
 *          You can write a similar format to specify the angle of mutation at a certain time:
 *          "10|30~50|15~100|-20"
 *          It rotates 30 degrees clockwise at frame 10, 15 degrees clockwise at frame 50, and 20 
 *          degrees counterclockwise at frame 100.
 *          This is defferent from 'Plugin Notice 6'.
 * ===============================================
 *      Regions:The default is [].List of regions where bullets disappear.
 *              e.g: [1,5]
 * ===============================================
 *      Terrains:The default is [].List of terrains where bullets disappear.
 * ===============================================
 *      Target:The default is [].List of character that bullets can collied with.
 *          "E[event id]":collied with event.
 *          "G[group id]":collied with event in group.
 *          "EV[variable]":collied with event whose id is variable.
 *          "P[]":collied with player.
 * ===============================================
 *      Pierce:The default is 0.The pierce times of bullet.
 *          Bullet can only pierce through event/player,can`t pierce through designated regions and terrains.
 * ===============================================
 *      Img:The default is"bullet0".The image name of bullet.
 *          The name can have parenthesis that contains frames and speed.
 *          "imageName[frames,speed]"
 *          e.g:   "flash1[4,5]"
 *          
 *          Use character`s image as the image of bullet.
 *          [0,character]
 *          character:-1 refer to player.the number greater than 0 refer to event.
 *
 *          Use text as the image of bullet.
 *          [1,text,text color,text size,text arrangement,max width,max height,text stroke color,text stroke size]
 *          text color/text stroke color:    e.g:#00FF00
 *          text arrangement:0 refer to Horizontal row,1 refer to Vertical row.
 *
 *          Use icon as the image of bullet.
 *          [2,icon id]
 * ===============================================
 *      Anim:The default is 0.the animation that bullet plays when it disappear.
 * ===============================================
 *      DeadCount:The default is 0.the fade time when it disappear.
 * ===============================================
 *      Speed*:The default is 12.the pixel the bullet moves per frame.
 * ===============================================
 *      Max:The default is 120(2 seconds).The max time bullet exists or the condition that bullet disappears.
 *          -1:The bullet exists forever unless using QJ.BL.setBulletDisappear(Name);/QJ.BL.deleteBullet(Name);
 *             The Name refer the attribute 'Name'.
 *          "S[id,true/false]":The bullet disappears when the switch is true/false.
 *          "SS[EventId,A/B/C/D,true/false]":The bullet disappears when the self switch A/B/C/D is true/false.
 *          "T[content]":Execute the content and obtain the result as a Boolean value.
 *              When the result is true, the bullet disappears.
 * ===============================================
 *      RotationAuto:The default is-1.
 *          -1:No effect.
 *          0-360:Fixed angle.
 *          361-1080:"The angle of move" is different with "the angle of the image".
 *              And this number minus 720 represents the rotation speed.
 *              (minus 720 can be negative counterclockwise, minus 720 can be positive clockwise)
 *              And the unit is degrees/frame.
 * ===============================================
 *      Action:The default is [].The action that bullet executes for Target.
 *          "C[commonEvent id]":start commonEvent.
 *          "S[id,true/false]":open/close switch.
 *          "SS[id,true/false]":open/close self switch.
 *          "E[]":erase event.
 *          "C[commonEvent id,value1,value2......]":start commonEvent and pass in parameters.
 *              (1) You can get the parameters in commonEvent. e.g:  this.BP[1] refer to value1.
 *              (2) You can use this.EID to get the Target character id.
 *                  -1 refer to player.the number greater than 0 refer to event.
 *              (3) Use this.bullet.x/this.bullet.y to get the x/y of bullet when it diasppears.
 *          "CP[page id]":call the page of event.
 *          "T[content]":execute content.
 * ===============================================
 *      CollisionBox:The default is "R[4,4]".Shape of the bullet`s Collider.
 *          "C[radius]":circle.
 *              The value AnchorX,AnchorY and scaleY of bullet will be uinvalid if you use this.
 *              scaleX will refer to the scale of whole circle.
 *              But the bullet can rebound if you use this.
 *          "R[width,height]":Rectangle.
 *              The value ReBound of bullet will be uinvalid if you use this.
 * ===============================================
 *      Tone:The default is [0,0,0,0].
 *          [red,green,blue,gray].
 * ===============================================
 *      Opacity*:0~255.
 * ===============================================
 *      AfterImage:The default is [](don`t show afterImage).
 *          (afterImage may mean drag effect.my English is so poor.)
 *          [color,initial opacity,max time,width]  e.g: ["#FF0000",150,10,0]
 *          color:color can be gradient value same as 'Plugin Notice 6'.
 *              e.g:
 *              ["0|#0000FF~10/#00FF00~10/#FF0000~10/#0000FF",150,10,0]
 *              The initial color of the afterImage is blue(#0000ff),then gradually turns green (#00ff00)
 *              within 10 frames, and then gradually turns red(#ff0000) within 10 frames,then gradually 
 *              change back to blue (#0000ff) within 10 frames, and then cycle.
 *          width:the width of afterImage.
 *              if the width is 0,the width of afterImage will be calculated automatically.
 * ===============================================
 *      Light:The default is {}(don`t show light).Show Light On Bullet.
 *          (need QJ-Lighting.js)
 *          the attributes can written in {}:
 *              lightId:the id of simple light
 *              synRotation:is the orientation of the bullet image and the orientation of the light synchronized
 * ===============================================
 *      Particles:The default is [](don`t use particles effect).Show particle effects near bullets.
 *          This may be complex.
 *          default value of a emitter which emits particles:
 *             {img:null,
 *              offsetX:0,
 *              offsetY:0,
 *              dir:Math.PI,
 *              dirOffset:Math.PI/6,
 *              max:30,
 *              deadCount:60,
 *              opacityMin:0.5,
 *              opacityMax:1,
 *              scaleMin:0.5,
 *              scaleMax:1.5,
 *              moveType:"-8*t;0",
 *              wait:2,
 *              num:1}
 *          img:the iamge of a particle.
 *          offsetX:The offset x of the particle emission point from the center of the bullet.
 *          offsetY:The offset y of the particle emission point from the center of the bullet
 *          dir:emitting direction, which is the direction relative to the bullet direction.
 *              Note that the unit here is radian rather than angle.
 *          dirOffset:The maximum offset range of the emission direction. If 0 is written, it 
 *              will be no offset. Note that the unit here is radian rather than angle.
 *          speed:-
 *          max:-
 *          deadCount:-
 *          opacityMin:Initial min opacity.Note that the range here is 0-1 instead of 0-255
 *          opacityMax:Initial max opacity.Note that the range here is 0-1 instead of 0-255
 *          scaleMin:Min scale.Note that the range here is 0-1 instead of 0-100.
 *          scaleMax:Max scale.Note that the range here is 0-1 instead of 0-100.
 *          moveType:Moving Type, here write the parameter function that crosses the zero point and is 
 *              continuous within the moving range (otherwise the effect will be strange or invalid).
 *
 *              The default is "-8*t;0".
 *              The symbol ; divides X and Y.the direction the particle faces is the positive half axis of the 
 *              X axis, and this axis rotates clockwise if the system is established by turning 90 degrees to 
 *              the y-axis, when the particle survives t frame, the relative coordinates of the particle are 
 *              (-8*t,0),the particle will retreat at a uniform speed.
 *
 *              If you want to make complex effects, please contact me.
 *
 *              Possible values:
 *              "-8*t;0":move straight.8 is speed. 
 *              "-8*t;24*Math.sin(t/3)":sinusoidal jitter.(24 and 3 can be changed).
 *              "t/2*Math.cos(t/2);t/2*Math.sin(t/2)":spiral motion.(2 can be changed).
 *
 *              For better results, polar equation is also supported here.When polar equation is used,
 *              | segmentation is applied to separate ρ and θ.
 *              ρ=sin(θ)   =>       "Math.sin(t)|t"        t represents time which always changes.("ρ(t)|θ(t)")
 *              "-8*t|0":move straight.8 is speed. 
 *              "144*Math.sin(3*t/180)|t/180":three roses line.
 *          wait:Interval time between two emitted particles.
 *          num:Number of particles emitted at a time.
 * ===============================================
 *      AtkRange:The default is 0.Atk range.
 *          If 0 is written here, the bullet will execute an action for Target chatracter after it collieds 
 *              with Target,and then disappear.
 *          If the region or terrain is written here, or the maximum duration is reached, it will disappear 
 *              directly.(if 'ReBound' is not true)
 *          If a number greater than 0 is written here, the bullet will not perform an action for Target chatracter 
 *              when it collied with Target directly.It will create a temporary circular collision body centered 
 *              on the disappearance position of the bullet. The number here represents the radius of the circle,
 *              and then perform actions for all Target chatracter in this circle.
 * ===============================================
 *      WaitBaseOnSpeed:The default is -2.
 *          -2:no effect.
 *          -1:The bullet cannot perform an action for Target chatracter.
 *              You can set AtkRange a number greater than 0 and set DeadAction/NoCollisionAction true
 *              to perform AOE damage.
 *          0:When the speed of the bullet is 0, it can attack the enemy or hit the wall.This function is 
 *              mainly used to trigger the test mine when the mine is thrown (mine gun) or placed (at this 
 *              time, the bullet speed as a mine is not 0) it cannot attack the enemy. It can attack the 
 *              Target chatracter only when it is placed (no longer moving, speed is 0).
 *          Integer greater than 0: the bullet can attack the enemy only when the bullet speed is this value
 * ===============================================
 *      DeadAction:The default is false.
 *          whether the bullet performs action when it collieds with regions or terrains.
 * ===============================================
 *      PierceAction:The default is false.
 *          whether the bullet performs action when it pierce through Target character.
 * ===============================================
 *      NoCollisionAction:The default is false.
 *          whether the bullet performs action when the attribute 'Max' is reached.
 * ===============================================
 *      DeadAnim:The default is true.
 *          whether the bullet plays animation when it collieds with regions or terrains.
 * ===============================================
 *      PierceAnim:The default is false.子弹进行穿透时,是否显示动画.
 *          whether the bullet plays animation when it pierce through Target character.
 * ===============================================
 *      NoCollisionAnim:The default is false.
 *          whether the bullet plays animation when the attribute 'Max' is reached.
 * ===============================================
 *      ReBound:The default is 0.
 *          The ReBound times of bullet.
 *          Only when 'CollisionBox' is circle,the bullet can rebound.  
 * ===============================================
 *      AnchorX:The default is 0.5.   (0-1)
 * ===============================================
 *      AnchorY:The default is 0.   (0-1)
 * ===============================================
 *      LMD:The default is true(Leave Map Disappear).
 *          If this attribute is true, the bullet will disappear directly when it leave the map(not screen).
 * ===============================================
 *      Bit:The default is false.
 *          When this switch is turned on, the bullet will not collied with anything.
 * ===============================================
 *      UpdateJS:The default is "".(string)
 *          eval will be executed for this string every frame when the bullet runs.
 * ===============================================
 *      MoveJS:The default is [].Specifies that after the bullet moves to a few frames, it starts 
 *          to execute a script every few frames.
 *          Base format:
 *          [wait time before circling,waiting interval,script]
 *          wait time before circling:greater than 0.
 *          waiting interval:greater than 0.
 *          script:string.
 *          e.g:     [[60,5,"console.log(this.speed)"],[0,5,"console.log(this.x)"]]
 *          After the bullet runs for 60 frames, output the bullet speed to the console once, and then 
 *          output the bullet speed to the console every 5 frames when the bullet starts running, the 
 *          X coordinate of the bullet is output to the console once, and then the X coordinate of the 
 *          bullet is output to the console every 5 frames.
 *          The rest are the same as UpdateJS.
 * ===============================================
 *      DeadJS:The default is "".string.an additional script that must be executed before the action 
 *          is executed when the bullet disappears.
 *          The rest are the same as UpdateJS.
 * ===============================================
 *      UpdateQT:The default is "".string.
 *           Each frame when the bullet runs will execute the instruction of 
 *           'preset text id'.
 * ===============================================
 *      MoveQT:The default is [].Specifies that after the bullet moves to a few frames, it starts 
 *          to execute the instruction of 'preset text id' every few frames.
 *          Base format:
 *          [wait time before circling,waiting interval,preset text id]
 *          e.g:     [[10,5,"test1"]]
 *          After the bullet runs for 10 frames, execute the instruction of 'preset text id' test1 
 *          once, and then execute the instruction of 'preset text id' test1 every 5 frames
 * ===============================================
 *      DeadQT:The default is "".string.the instruction of 'preset text id'must be executed before 
 *          the action is executed when the bullet disappears.
 * ===============================================
 *      Name:Assign a special number to the bullet.
 *          You can use QJ.BL.deleteBullet(Name); to directly delete the bullet with the specified 
 *          number without executing action and playing animation.
 *          Or use QJ.BL.setBulletDisappear(Name); make the bullet disappear normally as the attribute
 *          'Max' is reached.
 * ================================================================
 * 2.Based on the direction of the player or an event, the launch point is finely set to launch a 
 *   certain number of bullets within a certain angle range
 *   QJ.BL.Shooter_CharacterAtk(character,{},[ox2,oy2,ox4,oy4,ox6,oy6,ox8,oy8],[r1,r2,num,l]);
 *   QJ.BL.Shooter_CharacterAtk(character,{},[ox2,oy2,ox4,oy4,ox6,oy6,ox8,oy8]);
 *   QJ.BL.Shooter_ArcRange(initialRotation,{},[r1,r2,num,l])
 *
 *   character:-1 refer to player.the number greater than 0 refer to event.
 *
 *   [ox2,oy2,ox4,oy4,ox6,oy6,ox8,oy8]
 *
 *   [r1,r2,num,l]:
 *   r1/r2 are the additional angles,r1 is the additional starting angle,and r2 is the additional ending angle.
 *   num is the number of bullets fired in this range.l is the angular fluctuation number.
 *   Bullets are generally evenly distributed in a certain range. When l is equal to 0, there is no effect, and 
 *   when l is greater than 0 ,it will cause the angle to fluctuate within l degrees.
 *
 * ================================================================
 * 3.Call preset:
 *   Directly call the instruction of the 'text preset' in the plugin parameters, and then modify it in {}.
 *   QJ.BL.Quick(preser id,{})
 * ================================================================
 * 4.Execute the instructions in the page of an event in the current map.
 *   QJ.BL.CallEvent(event id,page id)
 * ================================================================
 * 5.Clear all bullets:
 *   QJ.BL.ClearAll()
 * ================================================================
 * 6.Turn mouse / finger click movement on or off.
 *   If clicking can make the player move and fire bullets at the same time, it will make the situation...
 *   Very strange
 *   QJ.BL.SetMove(true)
 *   QJ.BL.SetMove(false)
 * ================================================================
 * 7.Construct an Collider at the specified place and execute action on the target collided with this collider.
 *  The collision body disappears directly after one detection. It is equivalent to a flashing bullet.
 *
 *   QJ.BL.DirectAction(X,Y,CollisionBox,Action,Target);
 * ================================================================
 * 8.Get the number of bullets at this time.
 *
 *   $gameMap.bulletsNumber()
 * ================================================================
 * 9.the afterimage of character.
 *
 *   QJ.BL.Shadow(id,{})
 *
 *   id:-1 refer to player.the number greater than 0 refer to event.
 * ================================================================
 * 10.Throw missiles centered on the player character
 *
 * QJ.BL.Shooter_HandGrenade({},oneLength,oneTime,maxReBound);
 * (moveType is "QP[min width,angle,min time,bounce times]")
 * (AtkRange is greater than 0.)
 * (It's best not to modify Speed/MoveType.)
 *
 *
 *  oneLength:min bounce distance
 *  oneTime:min bounce time
 *  maxReBound:bounce times
 *  
 * default:
 *
 * QJ.BL.Shooter_HandGrenade({Img:"xzd"},56,30,3);
 *
 *
 * ================================================================
 * 11.Add a text bullet with characters or events as the center and text always facing down.
 * QJ.BL.Text(text,color,fontsize,linecolor,linewidth,character,{});
 * text:-
 * color:-
 * fontsize:-
 * linecolor:-
 * linewidth:-
 * character:-1 refer to player.the number greater than 0 refer to event.
 *
 * (It's best not to modify x/y/initialRotation.)
 *
 * ================================================================
 * 12.Multiple bullets are fired in one direction. Multiple bullets are arranged in 
 * a circle near the firing point and fired in one direction as a whole.
 *
 * QJ.BL.Shooter_C({},r,speed,roSpeed,number,initRotation,x,y) 
 * {}:
 * r:radius.
 * speed:The speed at which all bullets move as a whole.
 * roSpeed:The (angular) speed at which each bullet rotates along a circle as it moves.(0.05-1 is fine.)
 * number:-
 * initRotation:The direction in which all bullets move as a whole.
 * x/y:(can`t use G/GR/GRR)
 *
 * Default:
 * QJ.BL.Shooter_C({Img:"dart"},48,4,0.25,8,"M[]","P[]","P[]") 
 *
 * ================================================================
 * 13.Multiple bullets are fired in one direction. Multiple bullets are arranged as regular polygons 
 * near the firing point and fired in one direction as a whole
 *
 * QJ.BL.Shooter_P({},r,speed,roSpeed,number,initRotation,x,y,edgeNum) 
 * {}:
 * r:The radius of a regular polygon (the line between the center of the polygon and any vertex on the polygon).
 * speed:The speed at which all bullets move as a whole.
 * roSpeed:The (angular) speed at which each bullet rotates along a circle as it moves.(0.05-1 is fine.)
 * number:The number of bullets (including vertices) on each edge of the polygon. This value should be greater
 *      than or equal to 2, and it should be written as an odd number as far as possible. The effect of writing
 *      an even number may be poor
 * initRotation:The direction in which all bullets move as a whole.
 * x/y:(can`t use G/GR/GRR)
 * edgeNum:The number of sides of the polygon. Note that the number of sides should be a positive integer 
 *      greater than or equal to 2
 *
 * e.g:
 * Regular triangle:QJ.BL.Shooter_P({Img:"dart"},48,4,0.25,3,"M[]","P[]","P[]",3) 
 * Square:QJ.BL.Shooter_P({Img:"dart"},48,4,0.25,3,"M[]","P[]","P[]",4) 
 * Regular pentagon:QJ.BL.Shooter_P({Img:"dart"},48,4,0.25,3,"M[]","P[]","P[]",5) 
 *
 * ================================================================
 * 14.Shoot a laser in one direction. The laser will bounce back and cause damage to the Target.
 *
 * QJ.BL.Laser({ })
 *
 * name:The same as the 'Name' of QJ.BL.Shoot({}).
 * initialRotation:The default is "M[]".
 * RotationAuto:The default is -1.
 *          -1:change initialRotation automatically.
 *          0:don`t change.
 *          1-719:After subtracting 360, it is a fixed rotation speed. For example, when writing 360, 
 *              it does not rotate. When writing 361, it rotates 1 degree per frame, and when writing 359, 
 *              it rotates - 1 degree per frame
 * x/y:The default "P[]".
 *     "M[]"
 *     "P[]"
 *     "E[event id]"
 *     (can`t use G/GR/GRR)
 * z:The default "C[]".
 * Action:The default [].
 * Regions:The default [].
 * Terrains:The default [].
 * Target:The default [].
 * Img:The default "laser1".
 * ImgPoint:The default "laser1Point".The corner image of laser.
 * DeadCount:The default 10.
 * Opacity*:The default 255.
 * Width*:The default 12.
 * AtkWait:The default 30.
 * ReBound:The default 10.
 * Max:The default 120.
 * ScaleX*:-
 * MaxLength*:The default is 960.The max length of laser.(px)
 * 
 * QJ.BL.deleteLaser(name);
 * To eliminate the laser bound to an event / player.
 *
 * ================================================================
 * 15.Launch items around. Players can get this item after touching it
 *
 * QJ.BL.Shooter_Gain({},type,id,num)
 *
 * type:The type of item.
 *      0 refers to item.
 *      1 refers to weapon.
 *      2 refers to armor.
 *      3 refers to gold.
 * id:when type is 0/1/2,this should be the id of item/weapon/armor.
 *    the image of bullet will be the icon automatically.
 *    when type is 3,this should be the icon index of gold.
 * num:-
 *
 * e.g:
 * QJ.BL.Shooter_Gain({},0,2,5) gain 5 item whose id is 2
 * QJ.BL.Shooter_Gain({},1,6,6) gain 6 weapon whose id is 6
 * QJ.BL.Shooter_Gain({},2,7,2) gain 2 item whose id is 7
 * QJ.BL.Shooter_Gain({},3,5,100) gain 100 gold
 *
 * ================================================================
 * 16.Take two points as anchor points, display a picture between the two tracing points, 
 *  and then determine the attack between the two points
 * QJ.BL.TwoPoint(x1,y1,x2,y2,{});
 * x1,y1,x2,y2:x1/y1 is start point,x2/y2 is end point.
 * Possible values in {} :
 * name:The default "".
 * Img:-
 * Max:The default 120.
 * DeadCount:-
 * Opacity*:-
 * ScaleX*:-
 * Action:The default [].
 * Target:The default [].
 * Width*:The default 24.
 * AtkWait:The default 30.
 * ExtraRotation:Additional rotation angle added on the basis of judgment, with (x1, Y1) as the rotation center.
 *
 * QJ.BL.deleteTwoPoint(name);
 * 
 * ================================================================
 * 17.Make the event / player continue to produce residual shadows.
 *      QJ.BL.addShadow(character,{},time,delta)
 * time:Duration Time of shadow generation.The default 60.
 *      "S[id,true/false]"
 *      "SS[A/B/C/D,true/false]"
 *      "T[content]"
 * delta:Waiting time between two aftereffects.The default 1.
 * ================================================================
 * 18.Directly execute the instructions in 'text preset'.
 *      QJ.BL.quickOrder(id)
 * If the barrage firing commands of many events are the same, it will be very troublesome to change 
 * them one by one. At this time, the command can be used for direct unified control
 * ================================================================
 * 19.Fire bullets of random size at a certain angle.
 *      QJ.BL.Shooter_FlameThrower({},minScale,maxScale,offsetDir,num)
 * {}:
 * minScale/maxScale:Max and min magnification of bullet.
 * offsetDir:The max offset of the bullet along the initial angle of initialrotation specified in {}. 
 *      For example, if initialrotation is written as 90 and offsetdir is written as 10,The bullet will 
 *      be fired randomly within 80-100 degrees
 * num:Number of bullets fired at one time.
 * ================================================================
 * 三.You can write contents below in the notes on the first line of the event page.
 * ================================================================
 * 1.<BoxType:data> data is the same as 'CollisionBox'.
 * ================================================================
 * 2.<BoxOffset:x,y> change the x/y of event`s collider.
 * ================================================================
 * 3.<Group:"group id"> Then those events can be added to a group.
 * ================================================================
 * 四:Additional script instructions.
 * ================================================================
 * 1.Modify event default collision volume and offset:
 *      QJ.BL.setDefaultEventBox(CollisionBox,OffsetX,OffsetY)
 * ================================================================
 * 2.Modify the player's default collision volume and offset:
 *      QJ.BL.setPlayerBox(CollisionBox,OffsetX,OffsetY)
 * ================================================================
 *
 *
 *
 *
 * @param ======player preset======
 * @default
 *
 * @param playerInitBox
 * @type text
 * @text player preset collision box
 * @desc prefer to write C[24] R[48,48]
 * @default R[48,48]
 * @parent ======player preset======
 *
 * @param playerInitBoxOffsetX
 * @type text
 * @text player preset Offset X
 * @desc 0
 * @default 0
 * @parent ======player preset======
 *
 * @param playerInitBoxOffsetY
 * @type text
 * @text player preset Offset Y
 * @desc 0
 * @default 0
 * @parent ======player preset======
 *
 * @param ======event preset======
 * @default
 *
 * @param eventInitBox
 * @type text
 * @text event preset collision box
 * @desc prefer to write C[24] R[48,48]
 * @default R[48,48]
 * @parent ======event preset======
 *
 * @param eventInitBoxOffsetX
 * @type text
 * @text event preset Offset X
 * @desc 0
 * @default 0
 * @parent ======event preset======
 *
 * @param eventInitBoxOffsetY
 * @type text
 * @text event preset Offset Y
 * @desc 0
 * @default 0
 * @parent ======event preset======
 *
 * @param ======chaos======
 * @default
 *
 * @param forBidDestination
 * @type boolean
 * @text Cancel click Move
 * @desc Cancel click Move
 * @default true
 * @parent ======chaos======
 *
 * @param showWarn
 * @type boolean
 * @text Display warning message
 * @desc Display warning message
 * @default true
 * @parent ======chaos======
 *
 * @param maxbullet
 * @type number
 * @min 1
 * @text max number of bullet
 * @desc 
 * @default 500
 * @parent ======chaos======
 *
 * @param offsetGY
 * @type boolean
 * @text Automatic floating
 * @desc Automatic floating 6 pixels of walking map
 * @default false
 * @parent ======chaos======
 *
 * @param ======presets set======
 * @default
 *
 * @param reserveImg
 * @type []
 * @text Preload bullet name
 * @desc Preload bullet name，Multiple of the same type can be separated by |.
 * @default []
 * @parent ======presets set======
 *
 * @param preset
 * @type struct<persetdata>[]
 * @text Preset instruction
 * @desc QJ.BL.Quick(id,{}) can be used to call directly
 * @default []
 * @parent ======presets set======
 *
 * @param presetText
 * @type struct<persetdataType>[]
 * @text Text Preset
 * @desc use in UpdateQT/MoveQT/DeadQT.
 * @default []
 * @parent ======presets set======
 *
 * @param ======Display collision volume======
 * @default
 *
 * @param showBox
 * @type boolean
 * @text Display collision volume
 * @desc Display collision volume
 * @default false
 * @parent ======Display collision volume======
 *
 * @param regionShow
 * @type []
 * @text the list of showing region box
 * @desc The format is regionId|color (for example 1|#FF0000)
 * @default []
 * @parent ======Display collision volume======
 *
 * @param terrainShow
 * @type []
 * @text the list of showing terrain box
 * @desc The format is regionId|color (for example 1|#FF0000)
 * @default []
 * @parent ======Display collision volume======
 *
 * @param tile10Show
 * @type text
 * @text can`t pass color
 * @desc the color of the grid that can`t pass
 * @default #FF0000
 * @parent ======Display collision volume======
 *
 * @param characterShow
 * @type text
 * @text player` box color
 * @desc player` box color
 * @default #FF0000
 * @parent ======Display collision volume======
 *
 *
*/
/*~struct~persetdataType:
 *
 * @param name
 * @type text
 * @text id
 * @desc The id of this preset
 * @default 1
 *
 * @param content1
 * @type note
 * @text content1
 * @desc content1
 * @default 
 *
 * @param content2
 * @type note
 * @text content2
 * @desc content2
 * @default 
 *
 * @param content3
 * @type note
 * @text content3
 * @desc content3
 * @default 
 *
*/
/*~struct~persetdata:
 *
 * @param name
 * @type text
 * @text id
 * @desc The id of this preset
 * @default 1
 *
 * @param initialRotation
 * @type combo
 * @text initial Rotation
 * @desc initial Rotation
 * @default PD[]
 * @option PD[]
 * @option M[]
 * @option D[]
 * @option P[]
 * @option E[event id]
 * @option EV[variables id]
 * @option X[number]Y[number]
 * @option XM[number]YM[number]
 * @option G[group id]
 *
 * @param x
 * @type combo
 * @text x
 * @desc x
 * @default P[]
 * @option P[]
 * @option E[event id]
 *
 * @param y
 * @type combo
 * @text y
 * @desc y
 * @default P[]
 * @option P[]
 * @option E[event id]
 *
 * @param z
 * @type combo
 * @text z
 * @desc z
 * @default C[]
 * @option T[]
 * @option M[]
 * @option C[]
 * @option P[]
 *
 * @param scaleX
 * @type text
 * @text x scale
 * @desc x scale
 * @default 100
 *
 * @param scaleY
 * @type text
 * @text y scale
 * @desc y scale
 * @default 100
 *
 * @param MoveType
 * @type combo
 * @text move type
 * @desc Move Type
 * @default S[]
 * @option TP[min angle]
 * @option TE[min angle,event id]
 * @option TEV[min angle,variable id]
 * @option TG[min angle,group]
 * @option QP[min width,angle,min time,bounce times]
 * @option B[character,ox2,oy2,ox4,oy4,ox6,oy6,ox8,oy8]
 * @option F[content]
 *
 * @param rTRotation
 * @type text
 * @text Special angle increase.
 * @desc Special angle increase.
 * @default 
 *
 * @param Regions
 * @type text
 * @text Regions
 * @desc List of regions where bullets disappear.
 * @default []
 *
 * @param Terrains
 * @type text
 * @text Terrains
 * @desc List of terrains where bullets disappear.
 * @default []
 *
 * @param Target
 * @type text
 * @text Target
 * @desc List of character that bullets can collied with.
 * @default []
 *
 * @param Pierce
 * @type number
 * @text pierce times
 * @desc The pierce times of bullet
 * @default 0
 *
 * @param Img
 * @type file
 * @dir img/bullets
 * @text image name
 * @desc image name
 * @default 
 *
 * @param Anim
 * @type animation
 * @text anim id
 * @desc anim id
 * @default 0
 *
 * @param DeadCount
 * @type number
 * @text fade ou time
 * @desc fade ou time
 * @default 0
 *
 * @param Speed
 * @type text
 * @text speed
 * @desc speed
 * @default 12
 *
 * @param Max
 * @type text
 * @text max
 * @desc max
 * @default 120
 *
 * @param RotationAuto
 * @type text
 * @text special Rotation
 * @desc special Rotation
 * @default -1
 *
 * @param Action
 * @type text
 * @text Action
 * @desc "S[id,value]" "SS[id,value]" "E[]" "C[commonEvent id,value1,value2......]"  "CP[id]" "T[content]"
 * @default []
 *
 * @param CollisionBox
 * @type text
 * @text CollisionBox
 * @desc Shape of the bullet`s Collider.
 * @default R[4,4]
 *
 * @param Tone
 * @type text
 * @text Tone
 * @desc Tone [0,0,0,0]
 * @default [0,0,0,0]
 *
 * @param Opacity
 * @type text
 * @text Opacity
 * @desc Opacity
 * @default 255
 *
 * @param AfterImage
 * @type text
 * @text AfterImage
 * @desc AfterImage [color,initial opacity,max time,width]
 * @default []
 *
 * @param Light
 * @type text
 * @text light
 * @desc light
 * @default {}
 *
 * @param Particles
 * @type struct<particles>[]
 * @text Particles
 * @desc Particles
 * @default []
 *
 * @param AtkRange
 * @type number
 * @text AtkRange
 * @desc AtkRange
 * @default 0
 *
 * @param WaitBaseOnSpeed
 * @type text
 * @text special value
 * @desc special value
 * @default -2
 *
 * @param DeadAction
 * @type boolean
 * @text DeadAction
 * @desc whether the bullet performs action when it collieds with regions or terrains.
 * @default false
 *
 * @param PierceAction
 * @type boolean
 * @text PierceAction
 * @desc whether the bullet performs action when it pierce through Target character.
 * @default false
 *
 * @param NoCollisionAction
 * @type boolean
 * @text NoCollisionAction
 * @desc whether the bullet performs action when the attribute 'Max' is reached.
 * @default false
 *
 * @param DeadAnim
 * @type boolean
 * @text DeadAnim
 * @desc whether the bullet plays animation when it collieds with regions or terrains.
 * @default true
 *
 * @param PierceAnim
 * @type boolean
 * @text PierceAnim
 * @desc whether the bullet plays animation when it pierce through Target character.
 * @default false
 *
 * @param NoCollisionAnim
 * @type boolean
 * @text NoCollisionAnim
 * @desc whether the bullet plays animation when the attribute 'Max' is reached.
 * @default false
 *
 * @param ReBound
 * @type number
 * @text ReBound
 * @desc The ReBound times of bullet.
 * @default 0
 *
 * @param AnchorX
 * @type text
 * @text AnchorX
 * @desc AnchorX
 * @default 0.5
 *
 * @param AnchorY
 * @type text
 * @text AnchorY
 * @desc AnchorY
 * @default 0
 *
 * @param LMD
 * @type boolean
 * @text Leave Map Disappear
 * @desc If this attribute is true, the bullet will disappear directly when it leave the map(not screen).
 * @default true
 *
 * @param Bit
 * @type boolean
 * @text forbid to collied
 * @desc When this switch is turned on, the bullet will not collied with anything.
 * @default false
 *
 * @param UpdateJS
 * @type Note
 * @text UpdateJS
 * @desc 
 * @default 
 *
 * @param MoveJS
 * @type Note
 * @text MoveJS
 * @desc 
 * @default 
 *
 * @param DeadJS
 * @type Note
 * @text DeadJS
 * @desc 
 * @default 
 *
 * @param UpdateQT
 * @type Text
 * @text UpdateQT
 * @desc 
 * @default 
 *
 * @param MoveQT
 * @type Text
 * @text MoveQT
 * @desc 
 * @default 
 *
 * @param DeadQT
 * @type Text
 * @text DeadQT
 * @desc 
 * @default
 *
 * @param Name
 * @type Text
 * @text special name
 * @desc Assign a special number to the bullet.
 * @default 
 *
 * @param noPassDo
 * @type boolean
 * @text impassable grid
 * @desc Collision effect triggered by impassable grid
 * @default false
 *
*/
/*~struct~particles:
 * @param img
 * @type text
 * @text img name
 * @desc img name
 * @default 
 *
 * @param offsetX
 * @type number
 * @text offsetX
 * @desc offsetX
 * @default 0
 *
 * @param offsetY
 * @type text
 * @text offsetY
 * @desc offsetY
 * @default 0
 *
 * @param dir
 * @type text
 * @text direction
 * @desc direction
 * @default Math.PI
 *
 * @param dirOffset
 * @type text
 * @text dirOffset
 * @desc dirOffset
 * @default Math.PI/6
 *
 * @param max
 * @type number
 * @text max time
 * @desc max time
 * @default 120
 *
 * @param deadCount
 * @type number
 * @text fade time
 * @desc fade time
 * @default 10
 *
 * @param opacityMin
 * @type text
 * @text min opacity
 * @desc min opacity
 * @default 0.5
 *
 * @param opacityMax
 * @type text
 * @text max opacity
 * @desc max opacity
 * @default 1
 *
 * @param scaleMin
 * @type text
 * @text min scale
 * @desc min scale
 * @default 0.5
 *
 * @param scaleMax
 * @type text
 * @text max scale
 * @desc max scale
 * @default 1.5
 *
 * @param moveType
 * @type text
 * @text move type
 * @desc move type
 * @default -8*t;0
 *
 * @param wait
 * @type number
 * @text wait time
 * @desc wait time
 * @default 2
 *
*/
//=============================================================================
//particles
//=============================================================================
/*!
 * pixi-particles - v4.3.0
 * License MIT
 */
this.PIXI=this.PIXI||{},function(t,i){"use strict";var e,s=function(){function i(i,e,s){this.value=i,this.time=e,this.next=null,this.isStepped=!1,this.ease=s?"function"==typeof s?s:t.ParticleUtils.generateEase(s):null}return i.createList=function(e){if("list"in e){var s=e.list,r=void 0,n=s[0],a=n.value,h=n.time,o=r=new i("string"==typeof a?t.ParticleUtils.hexToRGB(a):a,h,e.ease);if(s.length>2||2===s.length&&s[1].value!==a)for(var l=1;l<s.length;++l){var p=s[l],d=p.value,c=p.time;r.next=new i("string"==typeof d?t.ParticleUtils.hexToRGB(d):d,c),r=r.next}return o.isStepped=!!e.isStepped,o}var u=new i("string"==typeof e.start?t.ParticleUtils.hexToRGB(e.start):e.start,0);return e.end!==e.start&&(u.next=new i("string"==typeof e.end?t.ParticleUtils.hexToRGB(e.end):e.end,1)),u},i}(),r=i;function n(t){return e(t)}e=parseInt(/^(\d+)\./.exec(i.VERSION)[1],10)<5?r.Texture.fromImage:r.Texture.from,function(t){t.verbose=!1,t.DEG_TO_RADS=Math.PI/180,t.rotatePoint=function(i,e){if(i){i*=t.DEG_TO_RADS;var s=Math.sin(i),r=Math.cos(i),n=e.x*r-e.y*s,a=e.x*s+e.y*r;e.x=n,e.y=a}},t.combineRGBComponents=function(t,i,e){return t<<16|i<<8|e},t.normalize=function(i){var e=1/t.length(i);i.x*=e,i.y*=e},t.scaleBy=function(t,i){t.x*=i,t.y*=i},t.length=function(t){return Math.sqrt(t.x*t.x+t.y*t.y)},t.hexToRGB=function(t,i){var e;return i||(i={}),"#"===t.charAt(0)?t=t.substr(1):0===t.indexOf("0x")&&(t=t.substr(2)),8===t.length&&(e=t.substr(0,2),t=t.substr(2)),i.r=parseInt(t.substr(0,2),16),i.g=parseInt(t.substr(2,2),16),i.b=parseInt(t.substr(4,2),16),e&&(i.a=parseInt(e,16)),i},t.generateEase=function(t){var i=t.length,e=1/i;return function(s){var r=i*s|0,n=(s-r*e)*i,a=t[r]||t[i-1];return a.s+n*(2*(1-n)*(a.cp-a.s)+n*(a.e-a.s))}},t.getBlendMode=function(t){if(!t)return i.BLEND_MODES.NORMAL;for(t=t.toUpperCase();t.indexOf(" ")>=0;)t=t.replace(" ","_");return i.BLEND_MODES[t]||i.BLEND_MODES.NORMAL},t.createSteppedGradient=function(i,e){void 0===e&&(e=10),("number"!=typeof e||e<=0)&&(e=10);var r=new s(t.hexToRGB(i[0].value),i[0].time);r.isStepped=!0;for(var n=r,a=i[0],h=1,o=i[h],l=1;l<e;++l){for(var p=l/e;p>o.time;)a=o,o=i[++h];p=(p-a.time)/(o.time-a.time);var d=t.hexToRGB(a.value),c=t.hexToRGB(o.value),u={r:(c.r-d.r)*p+d.r,g:(c.g-d.g)*p+d.g,b:(c.b-d.b)*p+d.b};n.next=new s(u,l/e),n=n.next}return r}}(t.ParticleUtils||(t.ParticleUtils={}));var a=function(t,i){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var e in i)i.hasOwnProperty(e)&&(t[e]=i[e])})(t,i)};function h(t,i){function e(){this.constructor=t}a(t,i),t.prototype=null===i?Object.create(i):(e.prototype=i.prototype,new e)}function o(t){return this.ease&&(t=this.ease(t)),(this.next.value-this.current.value)*t+this.current.value}function l(i){this.ease&&(i=this.ease(i));var e=this.current.value,s=this.next.value,r=(s.r-e.r)*i+e.r,n=(s.g-e.g)*i+e.g,a=(s.b-e.b)*i+e.b;return t.ParticleUtils.combineRGBComponents(r,n,a)}function p(t){for(this.ease&&(t=this.ease(t));t>this.next.time;)this.current=this.next,this.next=this.next.next;return t=(t-this.current.time)/(this.next.time-this.current.time),(this.next.value-this.current.value)*t+this.current.value}function d(i){for(this.ease&&(i=this.ease(i));i>this.next.time;)this.current=this.next,this.next=this.next.next;i=(i-this.current.time)/(this.next.time-this.current.time);var e=this.current.value,s=this.next.value,r=(s.r-e.r)*i+e.r,n=(s.g-e.g)*i+e.g,a=(s.b-e.b)*i+e.b;return t.ParticleUtils.combineRGBComponents(r,n,a)}function c(t){for(this.ease&&(t=this.ease(t));this.next&&t>this.next.time;)this.current=this.next,this.next=this.next.next;return this.current.value}function u(i){for(this.ease&&(i=this.ease(i));this.next&&i>this.next.time;)this.current=this.next,this.next=this.next.next;var e=this.current.value;return t.ParticleUtils.combineRGBComponents(e.r,e.g,e.b)}var m,f=function(){function t(t){void 0===t&&(t=!1),this.current=null,this.next=null,this.isColor=!!t,this.interpolate=null,this.ease=null}return t.prototype.reset=function(t){this.current=t,this.next=t.next,this.next&&this.next.time>=1?this.interpolate=this.isColor?l:o:t.isStepped?this.interpolate=this.isColor?u:c:this.interpolate=this.isColor?d:p,this.ease=this.current.ease},t}(),_=function(e){function s(t){var r=e.call(this)||this;return r.prevChild=r.nextChild=null,r.emitter=t,r.anchor.x=r.anchor.y=.5,r.velocity=new i.Point,r.rotationSpeed=0,r.rotationAcceleration=0,r.maxLife=0,r.age=0,r.ease=null,r.extraData=null,r.alphaList=new f,r.speedList=new f,r.speedMultiplier=1,r.acceleration=new i.Point,r.maxSpeed=NaN,r.scaleList=new f,r.scaleMultiplier=1,r.colorList=new f(!0),r._doAlpha=!1,r._doScale=!1,r._doSpeed=!1,r._doAcceleration=!1,r._doColor=!1,r._doNormalMovement=!1,r._oneOverLife=0,r.next=null,r.prev=null,r.init=r.init,r.Particle_init=s.prototype.init,r.update=r.update,r.Particle_update=s.prototype.update,r.Sprite_destroy=e.prototype.destroy,r.Particle_destroy=s.prototype.destroy,r.applyArt=r.applyArt,r.kill=r.kill,r}return h(s,e),s.prototype.init=function(){this.age=0,this.velocity.x=this.speedList.current.value*this.speedMultiplier,this.velocity.y=0,t.ParticleUtils.rotatePoint(this.rotation,this.velocity),this.noRotation?this.rotation=0:this.rotation*=t.ParticleUtils.DEG_TO_RADS,this.rotationSpeed*=t.ParticleUtils.DEG_TO_RADS,this.rotationAcceleration*=t.ParticleUtils.DEG_TO_RADS,this.alpha=this.alphaList.current.value,this.scale.x=this.scale.y=this.scaleList.current.value,this._doAlpha=!!this.alphaList.current.next,this._doSpeed=!!this.speedList.current.next,this._doScale=!!this.scaleList.current.next,this._doColor=!!this.colorList.current.next,this._doAcceleration=0!==this.acceleration.x||0!==this.acceleration.y,this._doNormalMovement=this._doSpeed||0!==this.speedList.current.value||this._doAcceleration,this._oneOverLife=1/this.maxLife;var i=this.colorList.current.value;this.tint=t.ParticleUtils.combineRGBComponents(i.r,i.g,i.b),this.visible=!0},s.prototype.applyArt=function(t){this.texture=t||i.Texture.EMPTY},s.prototype.update=function(i){if(this.age+=i,this.age>=this.maxLife||this.age<0)return this.kill(),-1;var e=this.age*this._oneOverLife;if(this.ease&&(e=4===this.ease.length?this.ease(e,0,1,1):this.ease(e)),this._doAlpha&&(this.alpha=this.alphaList.interpolate(e)),this._doScale){var s=this.scaleList.interpolate(e)*this.scaleMultiplier;this.scale.x=this.scale.y=s}if(this._doNormalMovement){var r=void 0,n=void 0;if(this._doSpeed){var a=this.speedList.interpolate(e)*this.speedMultiplier;t.ParticleUtils.normalize(this.velocity),t.ParticleUtils.scaleBy(this.velocity,a),r=this.velocity.x*i,n=this.velocity.y*i}else if(this._doAcceleration){var h=this.velocity.x,o=this.velocity.y;if(this.velocity.x+=this.acceleration.x*i,this.velocity.y+=this.acceleration.y*i,this.maxSpeed){var l=t.ParticleUtils.length(this.velocity);l>this.maxSpeed&&t.ParticleUtils.scaleBy(this.velocity,this.maxSpeed/l)}r=(h+this.velocity.x)/2*i,n=(o+this.velocity.y)/2*i}else r=this.velocity.x*i,n=this.velocity.y*i;this.position.x+=r,this.position.y+=n}if(this._doColor&&(this.tint=this.colorList.interpolate(e)),0!==this.rotationAcceleration){var p=this.rotationSpeed+this.rotationAcceleration*i;this.rotation+=(this.rotationSpeed+p)/2*i,this.rotationSpeed=p}else 0!==this.rotationSpeed?this.rotation+=this.rotationSpeed*i:this.acceleration&&!this.noRotation&&(this.rotation=Math.atan2(this.velocity.y,this.velocity.x));return e},s.prototype.kill=function(){this.emitter.recycle(this)},s.prototype.destroy=function(){this.parent&&this.parent.removeChild(this),this.Sprite_destroy(),this.emitter=this.velocity=this.colorList=this.scaleList=this.alphaList=this.speedList=this.ease=this.next=this.prev=null},s.parseArt=function(i){var e;for(e=i.length;e>=0;--e)"string"==typeof i[e]&&(i[e]=n(i[e]));if(t.ParticleUtils.verbose)for(e=i.length-1;e>0;--e)if(i[e].baseTexture!==i[e-1].baseTexture){window.console&&console.warn("PixiParticles: using particle textures from different images may hinder performance in WebGL");break}return i},s.parseData=function(t){return t},s}(i.Sprite),C=function(){function t(t){this.segments=[],this.countingLengths=[],this.totalLength=0,this.init(t)}return t.prototype.init=function(t){if(t&&t.length)if(Array.isArray(t[0]))for(var i=0;i<t.length;++i)for(var e=t[i],s=e[0],r=1;r<e.length;++r){var n=e[r];this.segments.push({p1:s,p2:n,l:0}),s=n}else for(s=t[0],i=1;i<t.length;++i){n=t[i];this.segments.push({p1:s,p2:n,l:0}),s=n}else this.segments.push({p1:{x:0,y:0},p2:{x:0,y:0},l:0});for(i=0;i<this.segments.length;++i){var a=this.segments[i],h=a.p1,o=a.p2,l=Math.sqrt((o.x-h.x)*(o.x-h.x)+(o.y-h.y)*(o.y-h.y));this.segments[i].l=l,this.totalLength+=l,this.countingLengths.push(this.totalLength)}},t.prototype.getRandomPoint=function(t){var i,e,s=Math.random()*this.totalLength;if(1===this.segments.length)i=this.segments[0],e=s;else for(var r=0;r<this.countingLengths.length;++r)if(s<this.countingLengths[r]){i=this.segments[r],e=0===r?s:s-this.countingLengths[r-1];break}e/=i.l||1;var n=i.p1,a=i.p2;t.x=n.x+e*(a.x-n.x),t.y=n.y+e*(a.y-n.y)},t}(),v=i;m=parseInt(/^(\d+)\./.exec(i.VERSION)[1],10)<5?v.ticker.shared:v.Ticker.shared;var x=new i.Point,y=function(){function e(t,i,e){this._currentImageIndex=-1,this._particleConstructor=_,this.particleImages=null,this.startAlpha=null,this.startSpeed=null,this.minimumSpeedMultiplier=1,this.acceleration=null,this.maxSpeed=NaN,this.startScale=null,this.minimumScaleMultiplier=1,this.startColor=null,this.minLifetime=0,this.maxLifetime=0,this.minStartRotation=0,this.maxStartRotation=0,this.noRotation=!1,this.minRotationSpeed=0,this.maxRotationSpeed=0,this.particleBlendMode=0,this.customEase=null,this.extraData=null,this._frequency=1,this.spawnChance=1,this.maxParticles=1e3,this.emitterLifetime=-1,this.spawnPos=null,this.spawnType=null,this._spawnFunc=null,this.spawnRect=null,this.spawnCircle=null,this.spawnPolygonalChain=null,this.particlesPerWave=1,this.particleSpacing=0,this.angleStart=0,this.rotation=0,this.ownerPos=null,this._prevEmitterPos=null,this._prevPosIsValid=!1,this._posChanged=!1,this._parent=null,this.addAtBack=!1,this.particleCount=0,this._emit=!1,this._spawnTimer=0,this._emitterLife=-1,this._activeParticlesFirst=null,this._activeParticlesLast=null,this._poolFirst=null,this._origConfig=null,this._origArt=null,this._autoUpdate=!1,this._currentImageIndex=-1,this._destroyWhenComplete=!1,this._completeCallback=null,this.parent=t,i&&e&&this.init(i,e),this.recycle=this.recycle,this.update=this.update,this.rotate=this.rotate,this.updateSpawnPos=this.updateSpawnPos,this.updateOwnerPos=this.updateOwnerPos}return Object.defineProperty(e.prototype,"orderedArt",{get:function(){return-1!==this._currentImageIndex},set:function(t){this._currentImageIndex=t?0:-1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"frequency",{get:function(){return this._frequency},set:function(t){this._frequency="number"==typeof t&&t>0?t:1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"particleConstructor",{get:function(){return this._particleConstructor},set:function(t){if(t!==this._particleConstructor){this._particleConstructor=t,this.cleanup();for(var i=this._poolFirst;i;i=i.next)i.destroy();this._poolFirst=null,this._origConfig&&this._origArt&&this.init(this._origArt,this._origConfig)}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){return this._parent},set:function(t){this.cleanup(),this._parent=t},enumerable:!0,configurable:!0}),e.prototype.init=function(e,r){if(e&&r){this.cleanup(),this._origConfig=r,this._origArt=e,e=Array.isArray(e)?e.slice():[e];var n=this._particleConstructor;this.particleImages=n.parseArt?n.parseArt(e):e,r.alpha?this.startAlpha=s.createList(r.alpha):this.startAlpha=new s(1,0),r.speed?(this.startSpeed=s.createList(r.speed),this.minimumSpeedMultiplier=("minimumSpeedMultiplier"in r?r.minimumSpeedMultiplier:r.speed.minimumSpeedMultiplier)||1):(this.minimumSpeedMultiplier=1,this.startSpeed=new s(0,0));var a=r.acceleration;a&&(a.x||a.y)?(this.startSpeed.next=null,this.acceleration=new i.Point(a.x,a.y),this.maxSpeed=r.maxSpeed||NaN):this.acceleration=new i.Point,r.scale?(this.startScale=s.createList(r.scale),this.minimumScaleMultiplier=("minimumScaleMultiplier"in r?r.minimumScaleMultiplier:r.scale.minimumScaleMultiplier)||1):(this.startScale=new s(1,0),this.minimumScaleMultiplier=1),r.color?this.startColor=s.createList(r.color):this.startColor=new s({r:255,g:255,b:255},0),r.startRotation?(this.minStartRotation=r.startRotation.min,this.maxStartRotation=r.startRotation.max):this.minStartRotation=this.maxStartRotation=0,r.noRotation&&(this.minStartRotation||this.maxStartRotation)?this.noRotation=!!r.noRotation:this.noRotation=!1,r.rotationSpeed?(this.minRotationSpeed=r.rotationSpeed.min,this.maxRotationSpeed=r.rotationSpeed.max):this.minRotationSpeed=this.maxRotationSpeed=0,this.rotationAcceleration=r.rotationAcceleration||0,this.minLifetime=r.lifetime.min,this.maxLifetime=r.lifetime.max,this.particleBlendMode=t.ParticleUtils.getBlendMode(r.blendMode),r.ease?this.customEase="function"==typeof r.ease?r.ease:t.ParticleUtils.generateEase(r.ease):this.customEase=null,n.parseData?this.extraData=n.parseData(r.extraData):this.extraData=r.extraData||null,this.spawnRect=this.spawnCircle=null,this.particlesPerWave=1,r.particlesPerWave&&r.particlesPerWave>1&&(this.particlesPerWave=r.particlesPerWave),this.particleSpacing=0,this.angleStart=0,this.parseSpawnType(r),this.frequency=r.frequency,this.spawnChance="number"==typeof r.spawnChance&&r.spawnChance>0?r.spawnChance:1,this.emitterLifetime=r.emitterLifetime||-1,this.maxParticles=r.maxParticles>0?r.maxParticles:1e3,this.addAtBack=!!r.addAtBack,this.rotation=0,this.ownerPos=new i.Point,this.spawnPos=new i.Point(r.pos.x,r.pos.y),this.initAdditional(e,r),this._prevEmitterPos=this.spawnPos.clone(),this._prevPosIsValid=!1,this._spawnTimer=0,this.emit=void 0===r.emit||!!r.emit,this.autoUpdate=!!r.autoUpdate,this.orderedArt=!!r.orderedArt}},e.prototype.initAdditional=function(t,i){},e.prototype.parseSpawnType=function(t){var e;switch(t.spawnType){case"rect":this.spawnType="rect",this._spawnFunc=this._spawnRect;var s=t.spawnRect;this.spawnRect=new i.Rectangle(s.x,s.y,s.w,s.h);break;case"circle":this.spawnType="circle",this._spawnFunc=this._spawnCircle,e=t.spawnCircle,this.spawnCircle=new i.Circle(e.x,e.y,e.r);break;case"ring":this.spawnType="ring",this._spawnFunc=this._spawnRing,e=t.spawnCircle,this.spawnCircle=new i.Circle(e.x,e.y,e.r),this.spawnCircle.minRadius=e.minR;break;case"burst":this.spawnType="burst",this._spawnFunc=this._spawnBurst,this.particleSpacing=t.particleSpacing,this.angleStart=t.angleStart?t.angleStart:0;break;case"point":this.spawnType="point",this._spawnFunc=this._spawnPoint;break;case"polygonalChain":this.spawnType="polygonalChain",this._spawnFunc=this._spawnPolygonalChain,this.spawnPolygonalChain=new C(t.spawnPolygon);break;default:this.spawnType="point",this._spawnFunc=this._spawnPoint}},e.prototype.recycle=function(t){t.next&&(t.next.prev=t.prev),t.prev&&(t.prev.next=t.next),t===this._activeParticlesLast&&(this._activeParticlesLast=t.prev),t===this._activeParticlesFirst&&(this._activeParticlesFirst=t.next),t.prev=null,t.next=this._poolFirst,this._poolFirst=t,t.parent&&t.parent.removeChild(t),--this.particleCount},e.prototype.rotate=function(i){if(this.rotation!==i){var e=i-this.rotation;this.rotation=i,t.ParticleUtils.rotatePoint(e,this.spawnPos),this._posChanged=!0}},e.prototype.updateSpawnPos=function(t,i){this._posChanged=!0,this.spawnPos.x=t,this.spawnPos.y=i},e.prototype.updateOwnerPos=function(t,i){this._posChanged=!0,this.ownerPos.x=t,this.ownerPos.y=i},e.prototype.resetPositionTracking=function(){this._prevPosIsValid=!1},Object.defineProperty(e.prototype,"emit",{get:function(){return this._emit},set:function(t){this._emit=!!t,this._emitterLife=this.emitterLifetime},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"autoUpdate",{get:function(){return this._autoUpdate},set:function(t){this._autoUpdate&&!t?m.remove(this.update,this):!this._autoUpdate&&t&&m.add(this.update,this),this._autoUpdate=!!t},enumerable:!0,configurable:!0}),e.prototype.playOnceAndDestroy=function(t){this.autoUpdate=!0,this.emit=!0,this._destroyWhenComplete=!0,this._completeCallback=t},e.prototype.playOnce=function(t){this.emit=!0,this._completeCallback=t},e.prototype.update=function(t){if(this._autoUpdate&&(t=t/i.settings.TARGET_FPMS/1e3),this._parent){var e,s,r,n,a;for(s=this._activeParticlesFirst;s;s=r)r=s.next,s.update(t);this._prevPosIsValid&&(n=this._prevEmitterPos.x,a=this._prevEmitterPos.y);var h=this.ownerPos.x+this.spawnPos.x,o=this.ownerPos.y+this.spawnPos.y;if(this._emit)for(this._spawnTimer-=t<0?0:t;this._spawnTimer<=0;){if(this._emitterLife>=0&&(this._emitterLife-=this._frequency,this._emitterLife<=0)){this._spawnTimer=0,this._emitterLife=0,this.emit=!1;break}if(this.particleCount>=this.maxParticles)this._spawnTimer+=this._frequency;else{var l=void 0;if(l=this.minLifetime===this.maxLifetime?this.minLifetime:Math.random()*(this.maxLifetime-this.minLifetime)+this.minLifetime,-this._spawnTimer<l){var p=void 0,d=void 0;if(this._prevPosIsValid&&this._posChanged){var c=1+this._spawnTimer/t;p=(h-n)*c+n,d=(o-a)*c+a}else p=h,d=o;e=0;for(var u=Math.min(this.particlesPerWave,this.maxParticles-this.particleCount);e<u;++e)if(!(this.spawnChance<1&&Math.random()>=this.spawnChance)){var m=void 0;this._poolFirst?(m=this._poolFirst,this._poolFirst=this._poolFirst.next,m.next=null):m=new this.particleConstructor(this),this.particleImages.length>1?-1!==this._currentImageIndex?(m.applyArt(this.particleImages[this._currentImageIndex++]),(this._currentImageIndex<0||this._currentImageIndex>=this.particleImages.length)&&(this._currentImageIndex=0)):m.applyArt(this.particleImages[Math.floor(Math.random()*this.particleImages.length)]):m.applyArt(this.particleImages[0]),m.alphaList.reset(this.startAlpha),1!==this.minimumSpeedMultiplier&&(m.speedMultiplier=Math.random()*(1-this.minimumSpeedMultiplier)+this.minimumSpeedMultiplier),m.speedList.reset(this.startSpeed),m.acceleration.x=this.acceleration.x,m.acceleration.y=this.acceleration.y,m.maxSpeed=this.maxSpeed,1!==this.minimumScaleMultiplier&&(m.scaleMultiplier=Math.random()*(1-this.minimumScaleMultiplier)+this.minimumScaleMultiplier),m.scaleList.reset(this.startScale),m.colorList.reset(this.startColor),this.minRotationSpeed===this.maxRotationSpeed?m.rotationSpeed=this.minRotationSpeed:m.rotationSpeed=Math.random()*(this.maxRotationSpeed-this.minRotationSpeed)+this.minRotationSpeed,m.rotationAcceleration=this.rotationAcceleration,m.noRotation=this.noRotation,m.maxLife=l,m.blendMode=this.particleBlendMode,m.ease=this.customEase,m.extraData=this.extraData,this.applyAdditionalProperties(m),this._spawnFunc(m,p,d,e),m.init(),this.addAtBack?this._parent.addChildAt(m,0):this._parent.addChild(m),this._activeParticlesLast?(this._activeParticlesLast.next=m,m.prev=this._activeParticlesLast,this._activeParticlesLast=m):this._activeParticlesLast=this._activeParticlesFirst=m,++this.particleCount,m.update(-this._spawnTimer)}}this._spawnTimer+=this._frequency}}if(this._posChanged&&(this._prevEmitterPos.x=h,this._prevEmitterPos.y=o,this._prevPosIsValid=!0,this._posChanged=!1),!this._emit&&!this._activeParticlesFirst){if(this._completeCallback){var f=this._completeCallback;this._completeCallback=null,f()}this._destroyWhenComplete&&this.destroy()}}},e.prototype.applyAdditionalProperties=function(t){},e.prototype._spawnPoint=function(t,i,e){this.minStartRotation===this.maxStartRotation?t.rotation=this.minStartRotation+this.rotation:t.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,t.position.x=i,t.position.y=e},e.prototype._spawnRect=function(i,e,s){this.minStartRotation===this.maxStartRotation?i.rotation=this.minStartRotation+this.rotation:i.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,x.x=Math.random()*this.spawnRect.width+this.spawnRect.x,x.y=Math.random()*this.spawnRect.height+this.spawnRect.y,0!==this.rotation&&t.ParticleUtils.rotatePoint(this.rotation,x),i.position.x=e+x.x,i.position.y=s+x.y},e.prototype._spawnCircle=function(i,e,s){this.minStartRotation===this.maxStartRotation?i.rotation=this.minStartRotation+this.rotation:i.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,x.x=Math.random()*this.spawnCircle.radius,x.y=0,t.ParticleUtils.rotatePoint(360*Math.random(),x),x.x+=this.spawnCircle.x,x.y+=this.spawnCircle.y,0!==this.rotation&&t.ParticleUtils.rotatePoint(this.rotation,x),i.position.x=e+x.x,i.position.y=s+x.y},e.prototype._spawnRing=function(i,e,s){var r=this.spawnCircle;this.minStartRotation===this.maxStartRotation?i.rotation=this.minStartRotation+this.rotation:i.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,r.minRadius!==r.radius?x.x=Math.random()*(r.radius-r.minRadius)+r.minRadius:x.x=r.radius,x.y=0;var n=360*Math.random();i.rotation+=n,t.ParticleUtils.rotatePoint(n,x),x.x+=this.spawnCircle.x,x.y+=this.spawnCircle.y,0!==this.rotation&&t.ParticleUtils.rotatePoint(this.rotation,x),i.position.x=e+x.x,i.position.y=s+x.y},e.prototype._spawnPolygonalChain=function(i,e,s){this.minStartRotation===this.maxStartRotation?i.rotation=this.minStartRotation+this.rotation:i.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,this.spawnPolygonalChain.getRandomPoint(x),0!==this.rotation&&t.ParticleUtils.rotatePoint(this.rotation,x),i.position.x=e+x.x,i.position.y=s+x.y},e.prototype._spawnBurst=function(t,i,e,s){0===this.particleSpacing?t.rotation=360*Math.random():t.rotation=this.angleStart+this.particleSpacing*s+this.rotation,t.position.x=i,t.position.y=e},e.prototype.cleanup=function(){var t,i;for(t=this._activeParticlesFirst;t;t=i)i=t.next,this.recycle(t),t.parent&&t.parent.removeChild(t);this._activeParticlesFirst=this._activeParticlesLast=null,this.particleCount=0},e.prototype.destroy=function(){var t;this.autoUpdate=!1,this.cleanup();for(var i=this._poolFirst;i;i=t)t=i.next,i.destroy();this._poolFirst=this._parent=this.particleImages=this.spawnPos=this.ownerPos=this.startColor=this.startScale=this.startAlpha=this.startSpeed=this.customEase=this._completeCallback=null},e}(),g=new i.Point,P=["pow","sqrt","abs","floor","round","ceil","E","PI","sin","cos","tan","asin","acos","atan","atan2","log"],w=new RegExp(["[01234567890\\.\\*\\-\\+\\/\\(\\)x ,]"].concat(P).join("|"),"g");var b=function(e){function s(t){var s=e.call(this,t)||this;return s.path=null,s.initialRotation=0,s.initialPosition=new i.Point,s.movement=0,s}return h(s,e),s.prototype.init=function(){this.initialRotation=this.rotation,this.Particle_init(),this.path=this.extraData.path,this._doNormalMovement=!this.path,this.movement=0,this.initialPosition.x=this.position.x,this.initialPosition.y=this.position.y},s.prototype.update=function(i){var e=this.Particle_update(i);if(e>=0&&this.path){if(this._doSpeed){var s=this.speedList.interpolate(e)*this.speedMultiplier;this.movement+=s*i}else{s=this.speedList.current.value*this.speedMultiplier;this.movement+=s*i}g.x=this.movement,g.y=this.path(this.movement),t.ParticleUtils.rotatePoint(this.initialRotation,g),this.position.x=this.initialPosition.x+g.x,this.position.y=this.initialPosition.y+g.y}return e},s.prototype.destroy=function(){this.Particle_destroy(),this.path=this.initialPosition=null},s.parseArt=function(t){return _.parseArt(t)},s.parseData=function(i){var e={};if(i&&i.path)try{e.path=function(t){for(var i=t.match(w),e=i.length-1;e>=0;--e)P.indexOf(i[e])>=0&&(i[e]="Math."+i[e]);return t=i.join(""),new Function("x","return "+t+";")}(i.path)}catch(i){t.ParticleUtils.verbose&&console.error("PathParticle: error in parsing path expression"),e.path=null}else t.ParticleUtils.verbose&&console.error("PathParticle requires a path string in extraData!"),e.path=null;return e},s}(_),S=function(t){function e(i){var e=t.call(this,i)||this;return e.textures=null,e.duration=0,e.framerate=0,e.elapsed=0,e.loop=!1,e}return h(e,t),e.prototype.init=function(){this.Particle_init(),this.elapsed=0,this.framerate<0&&(this.duration=this.maxLife,this.framerate=this.textures.length/this.duration)},e.prototype.applyArt=function(t){this.textures=t.textures,this.framerate=t.framerate,this.duration=t.duration,this.loop=t.loop},e.prototype.update=function(t){var e=this.Particle_update(t);if(e>=0){this.elapsed+=t,this.elapsed>this.duration&&(this.loop?this.elapsed=this.elapsed%this.duration:this.elapsed=this.duration-1e-6);var s=this.elapsed*this.framerate+1e-7|0;this.texture=this.textures[s]||i.Texture.EMPTY}return e},e.prototype.destroy=function(){this.Particle_destroy(),this.textures=null},e.parseArt=function(t){for(var e=[],s=0;s<t.length;++s){for(var r=t[s],a=e[s]={},h=a.textures=[],o=r.textures,l=0;l<o.length;++l){var p=o[l];if("string"==typeof p)h.push(n(p));else if(p instanceof i.Texture)h.push(p);else{var d=p.count||1;for(p="string"==typeof p.texture?n(p.texture):p.texture;d>0;--d)h.push(p)}}"matchLife"===r.framerate?(a.framerate=-1,a.duration=0,a.loop=!1):(a.loop=!!r.loop,a.framerate=r.framerate>0?r.framerate:60,a.duration=h.length/a.framerate)}return e},e}(_),R=function(t){function e(){var i=null!==t&&t.apply(this,arguments)||this;return i._firstChild=null,i._lastChild=null,i._childCount=0,i}return h(e,t),Object.defineProperty(e.prototype,"firstChild",{get:function(){return this._firstChild},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"lastChild",{get:function(){return this._lastChild},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"childCount",{get:function(){return this._childCount},enumerable:!0,configurable:!0}),e.prototype.addChild=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];if(t.length>1)for(var e=0;e<t.length;e++)this.addChild(t[e]);else{var s=t[0];s.parent&&s.parent.removeChild(s),s.parent=this,this.sortDirty=!0,s.transform._parentID=-1,this._lastChild?(this._lastChild.nextChild=s,s.prevChild=this._lastChild,this._lastChild=s):this._firstChild=this._lastChild=s,++this._childCount,this._boundsID++,this.onChildrenChange(),this.emit("childAdded",s,this,this._childCount),s.emit("added",this)}return t[0]},e.prototype.addChildAt=function(t,i){if(i<0||i>this._childCount)throw new Error("addChildAt: The index "+i+" supplied is out of bounds "+this._childCount);t.parent&&t.parent.removeChild(t),t.parent=this,this.sortDirty=!0,t.transform._parentID=-1;var e=t;if(this._firstChild)if(0===i)this._firstChild.prevChild=e,e.nextChild=this._firstChild,this._firstChild=e;else if(i===this._childCount)this._lastChild.nextChild=e,e.prevChild=this._lastChild,this._lastChild=e;else{for(var s=0,r=this._firstChild;s<i;)r=r.nextChild,++s;r.prevChild.nextChild=e,e.prevChild=r.prevChild,e.nextChild=r,r.prevChild=e}else this._firstChild=this._lastChild=e;return++this._childCount,this._boundsID++,this.onChildrenChange(i),t.emit("added",this),this.emit("childAdded",t,this,i),t},e.prototype.addChildBelow=function(t,i){if(i.parent!==this)throw new Error("addChildBelow: The relative target must be a child of this parent");return t.parent&&t.parent.removeChild(t),t.parent=this,this.sortDirty=!0,t.transform._parentID=-1,i.prevChild.nextChild=t,t.prevChild=i.prevChild,t.nextChild=i,i.prevChild=t,this._firstChild===i&&(this._firstChild=t),++this._childCount,this._boundsID++,this.onChildrenChange(),this.emit("childAdded",t,this,this._childCount),t.emit("added",this),t},e.prototype.addChildAbove=function(t,i){if(i.parent!==this)throw new Error("addChildBelow: The relative target must be a child of this parent");return t.parent&&t.parent.removeChild(t),t.parent=this,this.sortDirty=!0,t.transform._parentID=-1,i.nextChild.prevChild=t,t.nextChild=i.nextChild,t.prevChild=i,i.nextChild=t,this._lastChild===i&&(this._lastChild=t),++this._childCount,this._boundsID++,this.onChildrenChange(),this.emit("childAdded",t,this,this._childCount),t.emit("added",this),t},e.prototype.swapChildren=function(t,i){if(t!==i&&t.parent===this&&i.parent===this){var e=t,s=e.prevChild,r=e.nextChild;t.prevChild=i.prevChild,t.nextChild=i.nextChild,i.prevChild=s,i.nextChild=r,this._firstChild===t?this._firstChild=i:this._firstChild===i&&(this._firstChild=t),this._lastChild===t?this._lastChild=i:this._lastChild===i&&(this._lastChild=t),this.onChildrenChange()}},e.prototype.getChildIndex=function(t){for(var i=0,e=this._firstChild;e&&e!==t;)e=e.nextChild,++i;if(!e)throw new Error("The supplied DisplayObject must be a child of the caller");return i},e.prototype.setChildIndex=function(t,i){if(i<0||i>=this._childCount)throw new Error("The index "+i+" supplied is out of bounds "+this._childCount);if(t.parent!==this)throw new Error("The supplied DisplayObject must be a child of the caller");if(t.nextChild&&(t.nextChild.prevChild=t.prevChild),t.prevChild&&(t.prevChild.nextChild=t.nextChild),this._firstChild===t&&(this._firstChild=t.nextChild),this._lastChild===t&&(this._lastChild=t.prevChild),t.nextChild=null,t.prevChild=null,this._firstChild)if(0===i)this._firstChild.prevChild=t,t.nextChild=this._firstChild,this._firstChild=t;else if(i===this._childCount)this._lastChild.nextChild=t,t.prevChild=this._lastChild,this._lastChild=t;else{for(var e=0,s=this._firstChild;e<i;)s=s.nextChild,++e;s.prevChild.nextChild=t,t.prevChild=s.prevChild,t.nextChild=s,s.prevChild=t}else this._firstChild=this._lastChild=t;this.onChildrenChange(i)},e.prototype.removeChild=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];if(t.length>1)for(var e=0;e<t.length;e++)this.removeChild(t[e]);else{var s=t[0];if(s.parent!==this)return null;s.parent=null,s.transform._parentID=-1,s.nextChild&&(s.nextChild.prevChild=s.prevChild),s.prevChild&&(s.prevChild.nextChild=s.nextChild),this._firstChild===s&&(this._firstChild=s.nextChild),this._lastChild===s&&(this._lastChild=s.prevChild),s.nextChild=null,s.prevChild=null,--this._childCount,this._boundsID++,this.onChildrenChange(),s.emit("removed",this),this.emit("childRemoved",s,this)}return t[0]},e.prototype.getChildAt=function(t){if(t<0||t>=this._childCount)throw new Error("getChildAt: Index ("+t+") does not exist.");if(0===t)return this._firstChild;if(t===this._childCount)return this._lastChild;for(var i=0,e=this._firstChild;i<t;)e=e.nextChild,++i;return e},e.prototype.removeChildAt=function(t){var i=this.getChildAt(t);return i.parent=null,i.transform._parentID=-1,i.nextChild&&(i.nextChild.prevChild=i.prevChild),i.prevChild&&(i.prevChild.nextChild=i.nextChild),this._firstChild===i&&(this._firstChild=i.nextChild),this._lastChild===i&&(this._lastChild=i.prevChild),i.nextChild=null,i.prevChild=null,--this._childCount,this._boundsID++,this.onChildrenChange(t),i.emit("removed",this),this.emit("childRemoved",i,this,t),i},e.prototype.removeChildren=function(t,i){void 0===t&&(t=0),void 0===i&&(i=this._childCount);var e=t,s=i,r=s-e;if(r>0&&r<=s){for(var n=[],a=this._firstChild,h=0;h<=s&&a;++h,a=a.nextChild)h>=e&&n.push(a);var o=n[0].prevChild,l=n[n.length-1].nextChild;l?l.prevChild=o:this._lastChild=o,o?o.nextChild=l:this._firstChild=l;for(h=0;h<n.length;++h)n[h].parent=null,n[h].transform&&(n[h].transform._parentID=-1),n[h].nextChild=null,n[h].prevChild=null;this._boundsID++,this.onChildrenChange(t);for(h=0;h<n.length;++h)n[h].emit("removed",this),this.emit("childRemoved",n[h],this,h);return n}if(0===r&&0===this._childCount)return[];throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},e.prototype.updateTransform=function(){var t,i;for(this._boundsID++,this.transform.updateTransform(this.parent.transform),this.worldAlpha=this.alpha*this.parent.worldAlpha,t=this._firstChild;t;t=i)i=t.nextChild,t.visible&&t.updateTransform()},e.prototype.calculateBounds=function(){var t,i;for(this._bounds.clear(),this._calculateBounds(),t=this._firstChild;t;t=i)if(i=t.nextChild,t.visible&&t.renderable)if(t.calculateBounds(),t._mask){var e=t._mask.maskObject||t._mask;e.calculateBounds(),this._bounds.addBoundsMask(t._bounds,e._bounds)}else t.filterArea?this._bounds.addBoundsArea(t._bounds,t.filterArea):this._bounds.addBounds(t._bounds);this._bounds.updateID=this._boundsID},e.prototype.getLocalBounds=function(t,e){void 0===e&&(e=!1);var s=i.DisplayObject.prototype.getLocalBounds.call(this,t);if(!e){var r=void 0,n=void 0;for(r=this._firstChild;r;r=n)n=r.nextChild,r.visible&&r.updateTransform()}return s},e.prototype.render=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable)if(this._mask||this.filters&&this.filters.length)this.renderAdvanced(t);else{this._render(t);var i=void 0,e=void 0;for(i=this._firstChild;i;i=e)e=i.nextChild,i.render(t)}},e.prototype.renderAdvanced=function(t){t.batch.flush();var i,e,s=this.filters,r=this._mask;if(s){this._enabledFilters||(this._enabledFilters=[]),this._enabledFilters.length=0;for(var n=0;n<s.length;n++)s[n].enabled&&this._enabledFilters.push(s[n]);this._enabledFilters.length&&t.filter.push(this,this._enabledFilters)}for(r&&t.mask.push(this,this._mask),this._render(t),i=this._firstChild;i;i=e)e=i.nextChild,i.render(t);t.batch.flush(),r&&t.mask.pop(this),s&&this._enabledFilters&&this._enabledFilters.length&&t.filter.pop()},e.prototype.renderWebGL=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable)if(this._mask||this.filters&&this.filters.length)this.renderAdvancedWebGL(t);else{this._renderWebGL(t);var i=void 0,e=void 0;for(i=this._firstChild;i;i=e)e=i.nextChild,i.renderWebGL(t)}},e.prototype.renderAdvancedWebGL=function(t){t.flush();var i,e,s=this._filters,r=this._mask;if(s){this._enabledFilters||(this._enabledFilters=[]),this._enabledFilters.length=0;for(var n=0;n<s.length;n++)s[n].enabled&&this._enabledFilters.push(s[n]);this._enabledFilters.length&&t.filterManager.pushFilter(this,this._enabledFilters)}for(r&&t.maskManager.pushMask(this,this._mask),this._renderWebGL(t),i=this._firstChild;i;i=e)e=i.nextChild,i.renderWebGL(t);t.flush(),r&&t.maskManager.popMask(this,this._mask),s&&this._enabledFilters&&this._enabledFilters.length&&t.filterManager.popFilter()},e.prototype.renderCanvas=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable){var i,e;for(this._mask&&t.maskManager.pushMask(this._mask),this._renderCanvas(t),i=this._firstChild;i;i=e)e=i.nextChild,i.renderCanvas(t);this._mask&&t.maskManager.popMask(t)}},e}(i.Container);t.AnimatedParticle=S,t.Emitter=y,t.GetTextureFromString=n,t.LinkedListContainer=R,t.Particle=_,t.PathParticle=b,t.PolygonalChain=C,t.PropertyList=f,t.PropertyNode=s}(this.PIXI.particles=this.PIXI.particles||{},PIXI);
//=============================================================================
//SAT.js
//=============================================================================
/*!
 * SAT.js - v0.9.0
 * License MIT
 */
if (!SATVector) {
    function SATVector(x, y) {  this['x'] = x || 0;  this['y'] = y || 0;}SATVector.prototype.copy = function (other) {  this['x'] = other['x'];  this['y'] = other['y'];  return this;};SATVector.prototype.clone = function () {  return new SATVector(this['x'], this['y']);};SATVector.prototype.perp = function () {  var x = this['x'];  this['x'] = this['y'];  this['y'] = -x;  return this;};SATVector.prototype.rotate = function (angle) {  var x = this['x'];  var y = this['y'];  this['x'] = x * Math.cos(angle) - y * Math.sin(angle);  this['y'] = x * Math.sin(angle) + y * Math.cos(angle);  return this;};SATVector.prototype.reverse = function () {  this['x'] = -this['x'];  this['y'] = -this['y'];  return this;};SATVector.prototype.normalize = function () {  var d = this.len();  if (d > 0) {    this['x'] = this['x'] / d;    this['y'] = this['y'] / d;  }  return this;};SATVector.prototype.add = function (other) {  this['x'] += other['x'];  this['y'] += other['y'];  return this;};SATVector.prototype.sub = function (other) {  this['x'] -= other['x'];  this['y'] -= other['y'];  return this;};SATVector.prototype.scale = function (x, y) {  this['x'] *= x;  this['y'] *= typeof y != 'undefined' ? y : x;  return this;};SATVector.prototype.project = function (other) {  var amt = this.dot(other) / other.len2();  this['x'] = amt * other['x'];  this['y'] = amt * other['y'];  return this;};SATVector.prototype.projectN = function (other) {  var amt = this.dot(other);  this['x'] = amt * other['x'];  this['y'] = amt * other['y'];  return this;};SATVector.prototype.reflect = function (axis) {  var x = this['x'];  var y = this['y'];  this.project(axis).scale(2);  this['x'] -= x;  this['y'] -= y;  return this;};SATVector.prototype.reflectN = function (axis) {  var x = this['x'];  var y = this['y'];  this.projectN(axis).scale(2);  this['x'] -= x;  this['y'] -= y;  return this;};SATVector.prototype.dot = function (other) {  return this['x'] * other['x'] + this['y'] * other['y'];};SATVector.prototype.len2 = function () {  return this.dot(this);};SATVector.prototype.len = function () {  return Math.sqrt(this.len2());};function SATCircle(pos, r) {  this['pos'] = pos || new SATVector();  this['r'] = r || 0;  this['offset'] = new SATVector();}SATCircle.prototype.getAABBAsBox = function () {  var r = this['r'];  var corner = this['pos'].clone().add(this['offset']).sub(new SATVector(r, r));  return new SATBox(corner, r * 2, r * 2);};SATCircle.prototype.getAABB = function () {  return this.getAABBAsBox().toPolygon();};SATCircle.prototype.setOffset = function (offset) {  this['offset'] = offset;  return this;};function SATPolygon(pos, points) {  this['pos'] = pos || new SATVector();  this['angle'] = 0;  this['offset'] = new SATVector();  this.setPoints(points || []);}SATPolygon.prototype.setPoints = function (points) {  var lengthChanged = !this['points'] || this['points'].length !== points.length;  if (lengthChanged) {    var i;    var calcPoints = this['calcPoints'] = [];    var edges = this['edges'] = [];    var normals = this['normals'] = [];    for (i = 0; i < points.length; i++) {      var p1 = points[i];      var p2 = i < points.length - 1 ? points[i + 1] : points[0];      if (p1 !== p2 && p1.x === p2.x && p1.y === p2.y) {        points.splice(i, 1);        i -= 1;        continue;      }      calcPoints.push(new SATVector());      edges.push(new SATVector());      normals.push(new SATVector());    }  }  this['points'] = points;  this._recalc();  return this;};SATPolygon.prototype.setAngle = function (angle) {  this['angle'] = angle;  this._recalc();  return this;};SATPolygon.prototype.setOffset = function (offset) {  this['offset'] = offset;  this._recalc();  return this;};SATPolygon.prototype.rotate = function (angle) {  var points = this['points'];  var len = points.length;  for (var i = 0; i < len; i++) {    points[i].rotate(angle);  }  this._recalc();  return this;};SATPolygon.prototype.translate = function (x, y) {  var points = this['points'];  var len = points.length;  for (var i = 0; i < len; i++) {    points[i]['x'] += x;    points[i]['y'] += y;  }  this._recalc();  return this;};SATPolygon.prototype._recalc = function () {  var calcPoints = this['calcPoints'];  var edges = this['edges'];  var normals = this['normals'];  var points = this['points'];  var offset = this['offset'];  var angle = this['angle'];  var len = points.length;  var i;  for (i = 0; i < len; i++) {    var calcPoint = calcPoints[i].copy(points[i]);    calcPoint['x'] += offset['x'];    calcPoint['y'] += offset['y'];    if (angle !== 0) {      calcPoint.rotate(angle);    }  }  for (i = 0; i < len; i++) {    var p1 = calcPoints[i];    var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];    var e = edges[i].copy(p2).sub(p1);    normals[i].copy(e).perp().normalize();  }  return this;};SATPolygon.prototype.getAABBAsBox = function () {  var points = this['calcPoints'];  var len = points.length;  var xMin = points[0]['x'];  var yMin = points[0]['y'];  var xMax = points[0]['x'];  var yMax = points[0]['y'];  for (var i = 1; i < len; i++) {    var point = points[i];    if (point['x'] < xMin) {      xMin = point['x'];    }    else if (point['x'] > xMax) {      xMax = point['x'];    }    if (point['y'] < yMin) {      yMin = point['y'];    }    else if (point['y'] > yMax) {      yMax = point['y'];    }  }  return new SATBox(this['pos'].clone().add(new SATVector(xMin, yMin)), xMax - xMin, yMax - yMin);};SATPolygon.prototype.getAABB = function () {  return this.getAABBAsBox().toPolygon();};SATPolygon.prototype.getCentroid = function () {  var points = this['calcPoints'];  var len = points.length;  var cx = 0;  var cy = 0;  var ar = 0;  for (var i = 0; i < len; i++) {    var p1 = points[i];    var p2 = i === len - 1 ? points[0] : points[i + 1];    var a = p1['x'] * p2['y'] - p2['x'] * p1['y'];    cx += (p1['x'] + p2['x']) * a;    cy += (p1['y'] + p2['y']) * a;    ar += a;  }  ar = ar * 3;  cx = cx / ar;  cy = cy / ar;  return new SATVector(cx, cy);};function SATBox(pos, w, h) {  this['pos'] = pos || new SATVector();  this['w'] = w || 0;  this['h'] = h || 0;}SATBox.prototype.toPolygon = function () {  var pos = this['pos'];  var w = this['w'];  var h = this['h'];  return new SATPolygon(new SATVector(pos['x'], pos['y']), [    new SATVector(), new SATVector(w, 0),    new SATVector(w, h), new SATVector(0, h)  ]);};function SATResponse() {  this['a'] = null;  this['b'] = null;  this['overlapN'] = new SATVector();  this['overlapV'] = new SATVector();  this.clear();}SATResponse.prototype.clear = function () {  this['aInB'] = true;  this['bInA'] = true;  this['overlap'] = Number.MAX_VALUE;  return this;};var T_VECTORS = [];for (var i = 0; i < 10; i++) { T_VECTORS.push(new SATVector()); }var T_ARRAYS = [];for (var i = 0; i < 5; i++) { T_ARRAYS.push([]); }var T_RESPONSE = new SATResponse();var TEST_POINT = new SATBox(new SATVector(), 0.000001, 0.000001).toPolygon();function flattenPointsOn(points, normal, result) {  var min = Number.MAX_VALUE;  var max = -Number.MAX_VALUE;  var len = points.length;  for (var i = 0; i < len; i++) {    var dot = points[i].dot(normal);    if (dot < min) { min = dot; }    if (dot > max) { max = dot; }  }  result[0] = min; result[1] = max;}function isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {  var rangeA = T_ARRAYS.pop();  var rangeB = T_ARRAYS.pop();  var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);  var projectedOffset = offsetV.dot(axis);  flattenPointsOn(aPoints, axis, rangeA);  flattenPointsOn(bPoints, axis, rangeB);  rangeB[0] += projectedOffset;  rangeB[1] += projectedOffset;  if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {    T_VECTORS.push(offsetV);    T_ARRAYS.push(rangeA);    T_ARRAYS.push(rangeB);    return true;  }  if (response) {    var overlap = 0;    if (rangeA[0] < rangeB[0]) {      response['aInB'] = false;      if (rangeA[1] < rangeB[1]) {        overlap = rangeA[1] - rangeB[0];        response['bInA'] = false;      } else {        var option1 = rangeA[1] - rangeB[0];        var option2 = rangeB[1] - rangeA[0];        overlap = option1 < option2 ? option1 : -option2;      }    } else {      response['bInA'] = false;      if (rangeA[1] > rangeB[1]) {        overlap = rangeA[0] - rangeB[1];        response['aInB'] = false;      } else {        var option1 = rangeA[1] - rangeB[0];        var option2 = rangeB[1] - rangeA[0];        overlap = option1 < option2 ? option1 : -option2;      }    }    var absOverlap = Math.abs(overlap);    if (absOverlap < response['overlap']) {      response['overlap'] = absOverlap;      response['overlapN'].copy(axis);      if (overlap < 0) {        response['overlapN'].reverse();      }    }  }  T_VECTORS.push(offsetV);  T_ARRAYS.push(rangeA);  T_ARRAYS.push(rangeB);  return false;}function voronoiRegion(line, point) {  var len2 = line.len2();  var dp = point.dot(line);  if (dp < 0) { return LEFT_VORONOI_REGION; }  else if (dp > len2) { return RIGHT_VORONOI_REGION; }  else { return MIDDLE_VORONOI_REGION; }}var LEFT_VORONOI_REGION = -1;var MIDDLE_VORONOI_REGION = 0;var RIGHT_VORONOI_REGION = 1;function pointInCircle(p, c) {  var differenceV = T_VECTORS.pop().copy(p).sub(c['pos']).sub(c['offset']);  var radiusSq = c['r'] * c['r'];  var distanceSq = differenceV.len2();  T_VECTORS.push(differenceV);  return distanceSq <= radiusSq;}function pointInPolygon(p, poly) {  TEST_POINT['pos'].copy(p);  T_RESPONSE.clear();  var result = SATtestPolygonPolygon(TEST_POINT, poly, T_RESPONSE);  if (result) {    result = T_RESPONSE['aInB'];  }  return result;}function SATtestCircleCircle(a, b, response) {  var differenceV = T_VECTORS.pop().copy(b['pos']).add(b['offset']).sub(a['pos']).sub(a['offset']);  var totalRadius = a['r'] + b['r'];  var totalRadiusSq = totalRadius * totalRadius;  var distanceSq = differenceV.len2();  if (distanceSq > totalRadiusSq) {    T_VECTORS.push(differenceV);    return false;  }  if (response) {    var dist = Math.sqrt(distanceSq);    response['a'] = a;    response['b'] = b;    response['overlap'] = totalRadius - dist;    response['overlapN'].copy(differenceV.normalize());    response['overlapV'].copy(differenceV).scale(response['overlap']);    response['aInB'] = a['r'] <= b['r'] && dist <= b['r'] - a['r'];    response['bInA'] = b['r'] <= a['r'] && dist <= a['r'] - b['r'];  }  T_VECTORS.push(differenceV);  return true;}function SATtestPolygonCircle(polygon, circle, response) {  var circlePos = T_VECTORS.pop().copy(circle['pos']).add(circle['offset']).sub(polygon['pos']);  var radius = circle['r'];  var radius2 = radius * radius;  var points = polygon['calcPoints'];  var len = points.length;  var edge = T_VECTORS.pop();  var point = T_VECTORS.pop();  for (var i = 0; i < len; i++) {    var next = i === len - 1 ? 0 : i + 1;    var prev = i === 0 ? len - 1 : i - 1;    var overlap = 0;    var overlapN = null;    edge.copy(polygon['edges'][i]);    point.copy(circlePos).sub(points[i]);    if (response && point.len2() > radius2) {      response['aInB'] = false;    }    var region = voronoiRegion(edge, point);    if (region === LEFT_VORONOI_REGION) {      edge.copy(polygon['edges'][prev]);      var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);      region = voronoiRegion(edge, point2);      if (region === RIGHT_VORONOI_REGION) {        var dist = point.len();        if (dist > radius) {          T_VECTORS.push(circlePos);          T_VECTORS.push(edge);          T_VECTORS.push(point);          T_VECTORS.push(point2);          return false;        } else if (response) {          response['bInA'] = false;          overlapN = point.normalize();          overlap = radius - dist;        }      }      T_VECTORS.push(point2);    } else if (region === RIGHT_VORONOI_REGION) {      edge.copy(polygon['edges'][next]);      point.copy(circlePos).sub(points[next]);      region = voronoiRegion(edge, point);      if (region === LEFT_VORONOI_REGION) {        var dist = point.len();        if (dist > radius) {          T_VECTORS.push(circlePos);          T_VECTORS.push(edge);          T_VECTORS.push(point);          return false;        } else if (response) {          response['bInA'] = false;          overlapN = point.normalize();          overlap = radius - dist;        }      }    } else {      var normal = edge.perp().normalize();      var dist = point.dot(normal);      var distAbs = Math.abs(dist);      if (dist > 0 && distAbs > radius) {        T_VECTORS.push(circlePos);        T_VECTORS.push(normal);        T_VECTORS.push(point);        return false;      } else if (response) {        overlapN = normal;        overlap = radius - dist;        if (dist >= 0 || overlap < 2 * radius) {          response['bInA'] = false;        }      }    }    if (overlapN && response && Math.abs(overlap) < Math.abs(response['overlap'])) {      response['overlap'] = overlap;      response['overlapN'].copy(overlapN);    }  }  if (response) {    response['a'] = polygon;    response['b'] = circle;    response['overlapV'].copy(response['overlapN']).scale(response['overlap']);  }  T_VECTORS.push(circlePos);  T_VECTORS.push(edge);  T_VECTORS.push(point);  return true;}function SATtestCirclePolygon(circle, polygon, response) {  var result = SATtestPolygonCircle(polygon, circle, response);  if (result && response) {    var a = response['a'];    var aInB = response['aInB'];    response['overlapN'].reverse();    response['overlapV'].reverse();    response['a'] = response['b'];    response['b'] = a;    response['aInB'] = response['bInA'];    response['bInA'] = aInB;  }  return result;}function SATtestPolygonPolygon(a, b, response) {  var aPoints = a['calcPoints'];  var aLen = aPoints.length;  var bPoints = b['calcPoints'];  var bLen = bPoints.length;  for (var i = 0; i < aLen; i++) {    if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, a['normals'][i], response)) {      return false;    }  }  for (var i = 0; i < bLen; i++) {    if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, b['normals'][i], response)) {      return false;    }  }  if (response) {    response['a'] = a;    response['b'] = b;    response['overlapV'].copy(response['overlapN']).scale(response['overlap']);  }  return true;}
}
//=============================================================================
//
//=============================================================================
var QJ=QJ||{};QJ['BL']=QJ['BL']||{};var Imported=Imported||{};Imported['QJBullet']=!![];var numberQJY=0x0;function Game_QJBullet(){this['initialize']['apply'](this,arguments);}function Game_QJLaser(){this['initialize']['apply'](this,arguments);}function Game_QJTwoPoint(){this['initialize']['apply'](this,arguments);}function Game_InterpreterForceQBCommonEvent(){this['initialize']['apply'](this,arguments);}function Game_InterpreterForceQBEvent(){this['initialize']['apply'](this,arguments);}function QJFrame(){this['initialize']['apply'](this,arguments);}if(QJ['LL']){(()=>{const _0x1f15d6=QJ['LL']['getCharacter'];QJ['LL']['getCharacter']=function(_0xf8906f){return _0x1f15d6['call'](this,_0xf8906f);};})();}(()=>{const _0x13a430='QJ-Bullet';const _0x325437=PluginManager['parameters'](_0x13a430);const _0x11fba7=eval(_0x325437['preset'])||[];const _0x1c6c81=eval(_0x325437['presetText'])||[];const _0x24471b=Number(_0x325437['maxbullet'])||0xc8;const _0x408440=eval(_0x325437['showWarn'])||!![];const _0xc93978=eval(_0x325437['reserveImg']);const _0x1577eb=(()=>{let _0x360705={};for(let _0x524e7d=0x0;_0x524e7d<_0x1c6c81['length'];_0x524e7d++){let _0x375202=JsonEx['parse'](_0x1c6c81[_0x524e7d]);let _0x5d5232=eval(_0x375202['content1']);if(_0x375202['content2']['length']>0x0)_0x5d5232=_0x5d5232+'+'+eval(_0x375202['content2']);if(_0x375202['content3']['length']>0x0)_0x5d5232=_0x5d5232+'+'+eval(_0x375202['content3']);_0x360705[String(_0x375202['name'])]=eval('(function(){'+_0x5d5232+'})');}return _0x360705;})();QJ['BL']['PresetText']=_0x1577eb;const _0x40d4b9=(()=>{let _0x10d370={};for(let _0x28ef1f=0x0;_0x28ef1f<_0x11fba7['length'];_0x28ef1f++){let _0x745fe4=JsonEx['parse'](_0x11fba7[_0x28ef1f]);_0x10d370[String(_0x745fe4['name'])]={'initialRotation':_0x745fe4['initialRotation'],'x':isNaN(Number(_0x745fe4['x']))?_0x745fe4['x']:Number(_0x745fe4['x']),'y':isNaN(Number(_0x745fe4['y']))?_0x745fe4['y']:Number(_0x745fe4['y']),'z':_0x745fe4['z'],'scaleX':isNaN(Number(_0x745fe4['scaleX']))?_0x745fe4['scaleX']:Number(_0x745fe4['scaleX']),'scaleY':isNaN(Number(_0x745fe4['scaleY']))?_0x745fe4['scaleY']:Number(_0x745fe4['scaleY']),'MoveType':_0x745fe4['MoveType'],'Regions':eval(_0x745fe4['Regions']),'Terrains':eval(_0x745fe4['Terrains']),'Target':eval(_0x745fe4['Target']),'Pierce':Number(_0x745fe4['Pierce']),'Img':(_0xcc6eb=>{let _0x549ca4;try{_0x549ca4=eval(_0xcc6eb);}catch(_0x1313a3){_0x549ca4=_0xcc6eb;}return _0x549ca4;})(_0x745fe4['Img']),'Anim':Number(_0x745fe4['Anim']),'DeadCount':Number(_0x745fe4['DeadCount']),'Speed':isNaN(Number(_0x745fe4['Speed']))?_0x745fe4['Speed']:Number(_0x745fe4['Speed']),'Max':isNaN(Number(_0x745fe4['Max']))?_0x745fe4['Max']:Number(_0x745fe4['Max']),'RotationAuto':Number(_0x745fe4['RotationAuto']),'Action':eval(_0x745fe4['Action']),'CollisionBox':_0x745fe4['CollisionBox'],'Tone':eval(_0x745fe4['Tone']),'Opacity':isNaN(Number(_0x745fe4['Opacity']))?_0x745fe4['Opacity']:Number(_0x745fe4['Opacity']),'AfterImage':eval(_0x745fe4['AfterImage']),'Light':eval(_0x745fe4['Light']),'Particles':eval(_0x745fe4['Particles']),'AtkRange':Number(_0x745fe4['AtkRange']),'DeadAction':eval(_0x745fe4['DeadAction']),'PierceAction':eval(_0x745fe4['PierceAction']),'NoCollisionAction':eval(_0x745fe4['NoCollisionAction']),'DeadAnim':eval(_0x745fe4['DeadAnim']),'PierceAnim':eval(_0x745fe4['PierceAnim']),'NoCollisionAnim':eval(_0x745fe4['NoCollisionAnim']),'ReBound':eval(_0x745fe4['ReBound']),'AnchorX':Number(_0x745fe4['AnchorX']),'AnchorY':Number(_0x745fe4['AnchorY']),'rTRotation':_0x745fe4['rTRotation'],'WaitBaseOnSpeed':isNaN(Number(_0x745fe4['WaitBaseOnSpeed']))?_0x745fe4['WaitBaseOnSpeed']:Number(_0x745fe4['WaitBaseOnSpeed']),'LMD':eval(_0x745fe4['LMD']),'Bit':eval(_0x745fe4['Bit']),'UpdateJS':_0x745fe4['UpdateJS'],'MoveJS':_0x745fe4['MoveJS'],'DeadJS':_0x745fe4['DeadJS'],'UpdateQT':_0x745fe4['UpdateQT'],'MoveQT':_0x745fe4['MoveQT'],'DeadQT':_0x745fe4['DeadQT'],'Name':_0x745fe4['Name'],'noPassDo':eval(_0x745fe4['noPassDo'])};}return _0x10d370;})();const _0x53ad7b=0x30;let _0x15f65b=null;let _0x2c0d3c=eval(_0x325437['forBidDestination'])||![];let _0x541f01={};const _0x2abc2a=eval(_0x325437['offsetGY']);let _0x36ae94=eval(_0x325437['showBox']);const _0xd01670=eval(_0x325437['regionShow'])['map']((_0x1f84ba,_0x2f59e2,_0x2f56d2)=>{if(_0x1f84ba['length']==0x0)return[];let _0x13870c=_0x1f84ba['split']('|');return[Number(_0x13870c[0x0]),_0x13870c[0x1]];});const _0x29fe50=eval(_0x325437['terrainShow'])['map']((_0x18f058,_0x363738,_0x578b02)=>{if(_0x18f058['length']==0x0)return[];let _0x599942=_0x18f058['split']('|');return[Number(_0x599942[0x0]),_0x599942[0x1]];});const _0xa0b7bc=String(_0x325437['tile10Show']);const _0x41fa9b=String(_0x325437['characterShow']);const _0x66388b=0xc;Input['keyMapper'][0x79]='F10';QJ['BL']['sprite']=null;Game_QJBullet['prototype']['initialize']=function(_0x2e2f1e,_0x1b556a){this['data']=_0x2e2f1e;this['index']=_0x1b556a;this['setBase']();this['setOthers']();};Game_QJBullet['prototype']['setBase']=function(){this['bulletMode']=0x0;this['rotationAuto']=this['data']['RotationAuto']>=0x0?this['data']['RotationAuto']*Math['PI']/0xb4:-0x1;this['max']=this['data']['Max'];this['time']=0x0;this['ReBound']=this['data']['ReBound'];this['Bit']=this['data']['Bit'];this['moveType']=this['data']['MoveType'];this['z']=this['data']['z'];if(this['moveType'][0x0]==0x9){this['x']=QJ['BL']['dealX'](this['data']['x'],null,!![]);this['y']=QJ['BL']['dealY'](this['data']['y'],null,!![]);if(this['x']==null||this['y']==null){$gameMap['removeBullet'](this['index']);return;}}else{this['_x']=this['data']['x']+$gameMap['displayX']()*0x30;this['_y']=this['data']['y']+$gameMap['displayY']()*0x30;this['x']=this['_x'];this['y']=this['_y'];}this['anchorX']=this['data']['AnchorX'];this['anchorY']=this['data']['AnchorY'];this['bitmap']=this['data']['Img'];this['tone']=this['data']['Tone'];this['animation']=this['data']['Anim'];this['dead']=![];this['rememberEvent']=[];if(typeof this['data']['rTRotation']=='string'&&this['data']['rTRotation']['length']>0x0){this['rTRotationManager']={};let _0x1125b9=this['data']['rTRotation']['split']('~');for(let _0x44d8cf=0x0,_0x14d18c=_0x1125b9['length'];_0x44d8cf<_0x14d18c;_0x44d8cf++){let _0x23ec1b=_0x1125b9[_0x44d8cf]['split']('|');this['rTRotationManager'][Number(_0x23ec1b[0x0])]=Number(_0x23ec1b[0x1])*Math['PI']/0xb4;}}this['target']=QJ['BL']['dealTarget'](this['data']['Target']);this['regions']=this['data']['Regions'];this['terrains']=this['data']['Terrains'];this['pierce']=this['data']['Pierce'];this['deadCount']=this['data']['DeadCount'];this['speed']=0x0;this['moveX']=0x0;this['moveY']=0x0;this['action']=this['data']['Action'];this['afterImage']=this['data']['AfterImage'];if(this['afterImage']['length']>0x0){this['afterImage'][0x0]=new QJFrame('afterImageColor',this['afterImage'][0x0],0x1);this['afterImage'][0x1]=new QJFrame('afterImageOpacity',this['afterImage'][0x1],0x0,!![]);this['afterImage'][0x3]=new QJFrame('afterImageWidth',this['afterImage'][0x3],0x0,!![]);}this['Particles']=QJ['BL']['dealParticles'](this['data']['Particles']);this['atkRange']=this['data']['AtkRange'];this['DeadAction']=this['data']['DeadAction'];this['PierceAction']=this['data']['PierceAction'];this['NoCollisionAction']=this['data']['NoCollisionAction'];this['DeadAnim']=this['data']['DeadAnim'];this['PierceAnim']=this['data']['PierceAnim'];this['NoCollisionAnim']=this['data']['NoCollisionAnim'];if(typeof this['data']['WaitBaseOnSpeed']=='string'){this['WaitBaseOnSpeedManager']={};let _0x11d89a=this['data']['WaitBaseOnSpeed']['split']('~');for(let _0x3ddef2=0x0,_0x200ab2=_0x11d89a['length'];_0x3ddef2<_0x200ab2;_0x3ddef2++){let _0x35c54d=_0x11d89a[_0x3ddef2]['split']('|');this['WaitBaseOnSpeedManager'][Number(_0x35c54d[0x0])]=Number(_0x35c54d[0x1]);}this['WaitBaseOnSpeed']=-0x2;this['updateWaitBaseOnSpeed']();}else this['WaitBaseOnSpeed']=this['data']['WaitBaseOnSpeed'];this['LMD']=this['data']['LMD'];this['UpdateJS']=this['data']['UpdateJS']['length']>0x0;this['MoveJS']=this['data']['MoveJS']['length']>0x0;if(this['MoveJS']){for(let _0x57a03a=0x0,_0x55ce6b=this['data']['MoveJS']['length'];_0x57a03a<_0x55ce6b;_0x57a03a++){this['data']['MoveJS'][_0x57a03a][0x3]=this['data']['MoveJS'][_0x57a03a][0x1];this['data']['MoveJS'][_0x57a03a][0x1]=0x0;}}this['DeadJS']=this['data']['DeadJS']['length']>0x0;this['UpdateQT']=this['data']['UpdateQT']['length']>0x0;this['MoveQT']=this['data']['MoveQT']['length']>0x0;if(this['MoveQT']){for(let _0x7c809e=0x0,_0x5abbda=this['data']['MoveQT']['length'];_0x7c809e<_0x5abbda;_0x7c809e++){this['data']['MoveQT'][_0x7c809e][0x3]=this['data']['MoveQT'][_0x7c809e][0x1];this['data']['MoveQT'][_0x7c809e][0x1]=0x0;}}this['DeadQT']=this['data']['DeadQT']['length']>0x0;this['Name']=this['data']['Name'];this['noPassDo']=this['data']['noPassDo'];if(QJ['LL']&&this['data']['Light']['lightId']){QJ['LL']['tempLightObject'](this['data']['Light']['lightId'],this,this['data']['Light']);}};Game_QJBullet['prototype']['setOthers']=function(){if(this['data']['MoveType'][0x0]==0x6){this['rM6S']=[0x0,0x0,0x0];this['RB6S']=[0x1,0x1];}if(typeof this['bitmap']=='object'){let _0x47638e=this['bitmap'];if(_0x47638e[0x0]==0x0){let _0x33f9a0=_0x47638e[0x1]==-0x1?$gamePlayer:$gameMap['event'](_0x47638e[0x1]),_0x635e89=null;if(!_0x33f9a0){this['setDirectDead']();return;}for(let _0x34b871 of SceneManager['_scene']['_spriteset']['_characterSprites']){if(_0x34b871['_character']==_0x33f9a0){_0x635e89=_0x34b871;break;}}if(!_0x635e89){this['setDirectDead']();return;}this['bitmap']=_0x47638e['concat']([_0x635e89['bitmap'],_0x635e89['_frame']['x'],_0x635e89['_frame']['y'],_0x635e89['_frame']['width'],_0x635e89['_frame']['height']]);if(_0x33f9a0['isObjectCharacter']()){this['y']-=0x6;this['_y']-=0x6;}if(this['anchorY']==0x0)this['anchorY']=0x1;}else if(_0x47638e[0x0]==0x1){}else $gameMap['removeBullet'](this['index']);}if([0x1,0x2,0x3,0x4,0x7]['includes'](this['moveType'][0x0]))this['maxRotation']=this['moveType'][0x1]*Math['PI']/0xb4;if(this['moveType'][0x0]==0x9){this['rotationMove']=QJ['BL']['dealInitialRotation'](this['data']['initialRotation'],null,this['x'],this['y']);}else{this['rotationMove']=this['data']['initialRotation'];}this['updateFadeValue']();this['rotation']=this['rotationMove'];this['updateImgRotation']();this['xyRem']=[[this['x'],this['y'],this['rotationMove']]];this['collidedCount']=0x0;this['boxType']=this['data']['CollisionBox'];this['refreshBox']();if(this['data']['MoveType'][0x0]==0x9||this['data']['MoveType'][0x0]==0x8||this['boxType'][0x0]!=0x0){this['ReBound']=0x0;}if(this['ReBound']>0x0)this['ReBound']++;QJ['BL']['setPostion'](this['QJBody'],this['x'],this['y']);};Game_QJBullet['prototype']['updateImgRotation']=function(){if(this['rotationAuto']==-0x1){if(this['moveType'][0x0]==0x6){this['rotation']=this['rM6S'][0x2];}else this['rotation']=this['rotationMove'];}else if(this['rotationAuto']>=0x0){if(this['rotationAuto']<=Math['PI']*0x2){this['rotation']=this['rotationAuto'];}else{this['rotation']+=this['rotationAuto']-Math['PI']*0x4;if(this['rotation']<0x0)this['rotation']+=0x2*Math['PI'];else if(this['rotation']>0x2*Math['PI'])this['rotation']-=0x2*Math['PI'];}}if(this['QJBody']&&this['QJBody']['setAngle']){this['QJBody']['setAngle'](this['rotation']);}};Game_QJBullet['prototype']['updateFadeValue']=function(){let _0x416afd=this['data']['scaleX']['get']()/0x64;let _0x1be4e2=this['data']['scaleY']['get']()/0x64;if(this['scaleX']!=_0x416afd||this['scaleY']!=_0x1be4e2){this['scaleX']=_0x416afd;this['scaleY']=_0x1be4e2;if(this['QJBody'])this['refreshBox']();}this['opacity']=this['data']['Opacity']['get']();if(this['rTRotationManager']){let _0x4daf67=this['rTRotationManager'][this['time']];if(typeof _0x4daf67=='number'){this['rotate'](_0x4daf67,!![]);this['updateImgRotation']();}}if((this['moveType'][0x0]==0x9||this['moveType'][0x0]==0x8||this['moveType'][0x0]==0x6)&&this['xyRem']){if(this['xyRem']['length']>0x1){let _0x310c9b=this['xyRem'][this['xyRem']['length']-0x1][0x0]-this['xyRem'][this['xyRem']['length']-0x2][0x0];let _0x34a31=this['xyRem'][this['xyRem']['length']-0x1][0x1]-this['xyRem'][this['xyRem']['length']-0x2][0x1];this['updateSpeed'](Math['sqrt'](_0x310c9b*_0x310c9b+_0x34a31*_0x34a31));}}else{this['updateSpeed'](this['data']['Speed']['get']());}};Game_QJBullet['prototype']['rotate']=function(_0x173051,_0x4ecc6e){if(_0x4ecc6e){this['rotationMove']+=_0x173051;}else{this['rotationMove']=_0x173051;}this['updateImgRotation']();this['updateSpeed']();};Game_QJBullet['prototype']['updateSpeed']=function(_0x45aad9){if(_0x45aad9==undefined)_0x45aad9=this['speed'];if(this['moveType'][0x0]!=0x5){this['speed']=_0x45aad9;this['moveX']=_0x45aad9*Math['sin'](this['rotationMove']);this['moveY']=-_0x45aad9*Math['cos'](this['rotationMove']);}};Game_QJBullet['prototype']['refreshBox']=function(){if(this['boxType'][0x0]==0x0){this['QJBody']=QJ['BL']['box'](this['_x'],this['_y'],[0x0,this['boxType'][0x1]*this['scaleX']]);}else if(this['boxType'][0x0]==0x1){this['QJBody']=QJ['BL']['box'](this['_x'],this['_y'],[0x1,this['boxType'][0x1]*this['scaleX'],this['boxType'][0x2]*this['scaleY']]);this['QJBody']['setOffset'](new SATVector(this['boxType'][0x1]*this['scaleX']*(0.5-this['anchorX']),this['boxType'][0x2]*this['scaleY']*(0.5-this['anchorY'])));}if(this['QJBody']['setAngle'])this['QJBody']['setAngle'](this['rotationMove']);};Game_QJBullet['prototype']['boxScreenX']=function(){return this['x'];};Game_QJBullet['prototype']['boxScreenY']=function(){return this['y'];};Game_QJBullet['prototype']['mapShowXQJ']=function(){return this['x'];};Game_QJBullet['prototype']['mapShowYQJ']=function(){return this['y'];};Game_QJBullet['prototype']['isDeadQJ']=function(){return this['dead'];};Game_QJBullet['prototype']['lightRotation']=function(){return this['rotation'];};Game_QJBullet['prototype']['screenShowX']=function(){return this['x']-$gameMap['displayX']()*0x30;};Game_QJBullet['prototype']['screenShowY']=function(){return this['y']-$gameMap['displayY']()*0x30;};Game_QJBullet['prototype']['showRotation']=function(){return this['rotation']*0xb4/Math['PI'];};Game_QJBullet['prototype']['showRotationMove']=function(){return this['rotationMove']*0xb4/Math['PI'];};Game_QJBullet['prototype']['showRotationLastMove']=function(_0x45b9dd){if(this['xyRem']['length']-0x1-_0x45b9dd<0x0)return this['rotationMove']*0xb4/Math['PI'];return this['xyRem'][this['xyRem']['length']-0x1-_0x45b9dd][0x2]*0xb4/Math['PI'];};Game_QJBullet['prototype']['screenShowXLast']=function(_0x59c3d){if(this['xyRem']['length']-0x1-_0x59c3d<0x0)return this['x']-$gameMap['displayX']()*0x30;return this['xyRem'][this['xyRem']['length']-0x1-_0x59c3d][0x0]-$gameMap['displayX']()*0x30;};Game_QJBullet['prototype']['screenShowYLast']=function(_0x1f5f10){if(this['xyRem']['length']-0x1-_0x1f5f10<0x0)return this['y']-$gameMap['displayY']()*0x30;return this['xyRem'][this['xyRem']['length']-0x1-_0x1f5f10][0x1]-$gameMap['displayY']()*0x30;};Game_QJBullet['prototype']['updateRotation']=function(){if(this['moveType'][0x0]==0x0){this['x']+=this['moveX'];this['y']+=this['moveY'];QJ['BL']['setPostion'](this['QJBody'],this['x'],this['y']);}if(this['speed']>0x0&&[0x1,0x2,0x3,0x4,0x7]['includes'](this['moveType'][0x0])){let _0x17f365=this['getSpecialTargetXy']();if(_0x17f365[0x0]==null){this['x']+=this['moveX'];this['y']+=this['moveY'];QJ['BL']['setPostion'](this['QJBody'],this['x'],this['y']);return;}let _0x5287cc=this['x'],_0x3d4e6a=this['y'],_0x36f52d=_0x17f365[0x0],_0x3ed945=_0x17f365[0x1],_0x211fba=QJ['BL']['calculateAngleByTwoPoint'](_0x5287cc,_0x3d4e6a,_0x36f52d,_0x3ed945);let _0x586b0b=Math['abs'](_0x211fba-this['rotationMove']);_0x586b0b=_0x586b0b>Math['PI']?Math['PI']*0x2-_0x586b0b:_0x586b0b;if(_0x586b0b<=this['maxRotation'])this['rotate'](_0x211fba);else{let _0x3eb5d3=Math['abs'](_0x211fba-this['rotationMove']-this['maxRotation']);let _0x140354=Math['abs'](_0x211fba-this['rotationMove']+this['maxRotation']);_0x3eb5d3=_0x3eb5d3>Math['PI']?Math['PI']*0x2-_0x3eb5d3:_0x3eb5d3;_0x140354=_0x140354>Math['PI']?Math['PI']*0x2-_0x140354:_0x140354;if(_0x3eb5d3>_0x140354)this['rotate'](-this['maxRotation'],!![]);else this['rotate'](this['maxRotation'],!![]);}this['x']+=this['moveX'];this['y']+=this['moveY'];QJ['BL']['setPostion'](this['QJBody'],this['x'],this['y']);}if(this['moveType'][0x0]==0x5){let _0x232357=null;if(this['moveType'][0x1]==-0x1)_0x232357=$gamePlayer;else _0x232357=$gameMap['event'](this['moveType'][0x1]);if(!_0x232357){this['setDirectDead']();return;}let _0x33d44d=_0x232357['direction']();this['x']=_0x232357['boxScreenRealX']()+this['moveType'][_0x33d44d];this['y']=_0x232357['boxScreenRealY']()+this['moveType'][_0x33d44d+0x1];QJ['BL']['setPostion'](this['QJBody'],this['x'],this['y']);}if(this['moveType'][0x0]==0x6&&!this['dead']){if(this['moveType'][0x4]==0x0)return;let _0x44f1cf=this['moveType'];if(_0x44f1cf['length']<0x6){_0x44f1cf[0x5]=this['data']['initialRotation'];if(_0x44f1cf[0x5]>=Math['PI'])_0x44f1cf[0x2]=Math['PI']*0x2-_0x44f1cf[0x2];this['updateMoveType6'](_0x44f1cf);}_0x44f1cf[0x6]--;let _0x294785=_0x44f1cf[0xe]*_0x44f1cf[0x6]*(_0x44f1cf[0x7]-_0x44f1cf[0x6]);let _0x35fc77=this['RB6S'][0x0]*_0x44f1cf[0xd]*Math['cos'](_0x44f1cf[0x2]);let _0x3b737e=-this['RB6S'][0x1]*(_0x44f1cf[0xd]*Math['sin'](_0x44f1cf[0x2])-_0x44f1cf[0xe]*(_0x44f1cf[0x7]-_0x44f1cf[0x6]));if(_0x44f1cf[0x6]<=0x0){_0x44f1cf[0x4]--;this['updateMoveType6'](_0x44f1cf);}this['x']=this['x']+_0x35fc77;this['y']=_0x44f1cf[0x4]==0x0?_0x44f1cf[0x10]:this['y']+_0x3b737e;QJ['BL']['setPostion'](this['QJBody'],this['x'],this['y']);this['rotationMove']=QJ['BL']['calculateAngleByTwoPoint'](0x0,0x0,_0x35fc77,_0x3b737e);this['rM6S']=[_0x35fc77,_0x3b737e,this['rotationMove']];}if(this['moveType'][0x0]==0x8&&!this['dead']){let _0x5505d=this['data']['initialRotation'],_0x2efca4=this['moveType'],_0x15138f=this['time'],_0x57d8b3=0x0,_0x54f7c1=0x0,_0x4af351=0x0,_0x5b5bce=0x0;try{if(_0x2efca4[0x1]==0x0){_0x57d8b3=-0x1*Number(eval(_0x2efca4[0x2]));_0x54f7c1=Number(eval(_0x2efca4[0x3]));}else{let _0x32356e=-0x1*Number(eval(_0x2efca4[0x2])),_0x3f7e7a=Number(eval(_0x2efca4[0x3]));_0x57d8b3=_0x32356e*Math['cos'](_0x3f7e7a);_0x54f7c1=_0x32356e*Math['sin'](_0x3f7e7a);}}catch(_0x46c0f3){if(_0x408440)console['warn']('The\x20moveType\x20is\x20wrong.');_0x57d8b3=0x0;_0x54f7c1=0x0;}if(!_0x57d8b3&&_0x57d8b3!=0x0){_0x57d8b3=0x0;if(_0x408440)console['warn']('The\x20moveType\x20is\x20wrong.');}if(!_0x54f7c1&&_0x54f7c1!=0x0){_0x54f7c1=0x0;if(_0x408440)console['warn']('The\x20moveType\x20is\x20wrong.');}let _0x5b1ba1=this['x'],_0x52b7f5=this['y'];this['x']=_0x57d8b3*Math['sin'](_0x5505d)+_0x54f7c1*Math['sin'](_0x5505d+Math['PI']/0x2)+this['_x'];this['y']=-_0x57d8b3*Math['cos'](_0x5505d)-_0x54f7c1*Math['cos'](_0x5505d+Math['PI']/0x2)+this['_y'];this['rotationMove']=QJ['BL']['calculateAngleByTwoPoint'](_0x5b1ba1,_0x52b7f5,this['x'],this['y']);QJ['BL']['setPostion'](this['QJBody'],this['x'],this['y']);}if(this['moveType'][0x0]==0x9){this['x']=QJ['BL']['dealX'](this['data']['x'],null,!![])+$gameMap['displayX']()*0x30;this['y']=QJ['BL']['dealY'](this['data']['y'],null,!![])+$gameMap['displayY']()*0x30;if(this['x']==null||this['y']==null){this['setDirectDead']();return;}else{this['rotationMove']=QJ['BL']['dealInitialRotation'](this['data']['initialRotation'],null,this['x'],this['y']);QJ['BL']['setPostion'](this['QJBody'],this['x'],this['y']);}}this['updateImgRotation']();};Game_QJBullet['prototype']['updateMoveType6']=function(_0x4c3e78){_0x4c3e78[0x6]=_0x4c3e78[0x3]*_0x4c3e78[0x4];_0x4c3e78[0x7]=_0x4c3e78[0x6];_0x4c3e78[0x8]=_0x4c3e78[0x1]*_0x4c3e78[0x4];_0x4c3e78[0x9]=this['x']+_0x4c3e78[0x8]*Math['sin'](_0x4c3e78[0x5]);_0x4c3e78[0xa]=this['y']-_0x4c3e78[0x8]*Math['cos'](_0x4c3e78[0x5]);_0x4c3e78[0xb]=_0x4c3e78[0x8]*Math['sin'](_0x4c3e78[0x5])/_0x4c3e78[0x7];_0x4c3e78[0xc]=-_0x4c3e78[0x8]*Math['cos'](_0x4c3e78[0x5])/_0x4c3e78[0x7];_0x4c3e78[0xd]=_0x4c3e78[0x8]*Math['sin'](_0x4c3e78[0x5])/_0x4c3e78[0x7]/Math['cos'](_0x4c3e78[0x2]);_0x4c3e78[0xe]=0x2/(_0x4c3e78[0x7]*_0x4c3e78[0x7])*(_0x4c3e78[0xd]*Math['sin'](_0x4c3e78[0x2])*_0x4c3e78[0x7]-_0x4c3e78[0x8]*Math['cos'](_0x4c3e78[0x5]));_0x4c3e78[0xf]=this['x'];_0x4c3e78[0x10]=this['y'];};Game_QJBullet['prototype']['updateWaitBaseOnSpeed']=function(){if(this['WaitBaseOnSpeedManager']){let _0x4ca8f2=this['WaitBaseOnSpeedManager'][this['time']];if(typeof _0x4ca8f2=='number')this['WaitBaseOnSpeed']=_0x4ca8f2;}};Game_QJBullet['prototype']['getSpecialTargetXy']=function(){let _0x479070=null;if(this['moveType'][0x0]==0x1)_0x479070=$gamePlayer;if(this['moveType'][0x0]==0x2||this['moveType'][0x0]==0x3)_0x479070=$gameMap['event'](this['moveType'][0x2]);if(this['moveType'][0x0]==0x4)_0x479070=$gameMap['event'](QJ['BL']['getMinEventId'](this['x'],this['y'],this['moveType'][0x2]));if(this['moveType'][0x0]==0x7)_0x479070=$gameMap['event'](QJ['BL']['getMinEventIdNobi'](this['x'],this['y'],this['moveType'][0x2]));if(_0x479070){return[_0x479070['boxScreenX'](),_0x479070['boxScreenY']()];}else{return[null,null];}};Game_QJBullet['prototype']['backToLastXYR']=function(){let _0x20aafb=this['xyRem']['pop']();this['x']=_0x20aafb[0x0];this['y']=_0x20aafb[0x1];this['rotationMove']=_0x20aafb[0x2];QJ['BL']['setPostion'](this['QJBody'],this['x'],this['y']);};Game_QJBullet['prototype']['destroy']=function(){};Game_QJBullet['prototype']['update']=function(){if(this['dead']){if(this['deadMode']==0x3){if(this['delayDelete']>0x0){this['delayDelete']--;}else{$gameMap['removeBullet'](this['index']);return;}}if(this['perFade']==undefined){if(this['deadCount']<=0x0)this['opacity']=0x0;else{this['perFade']=Math['max'](this['opacity']/this['deadCount'],0x1);}}else this['opacity']-=this['perFade'];return;}if(this['LMD']){if(this['x']>$gameMap['maxScreenWidth']||this['x']<0x0||this['y']<0x0||this['y']>$gameMap['maxScreenHeight']){this['setDirectDead']();return;}}this['updateWaitBaseOnSpeed']();this['updateFadeValue']();this['updateRotation']();if(this['UpdateJS'])eval(this['data']['UpdateJS']);if(this['MoveJS']){for(let _0x182411=0x0,_0x1d8093=this['data']['MoveJS']['length'];_0x182411<_0x1d8093;_0x182411++){if(this['data']['MoveJS'][_0x182411][0x0]<=0x0){if(this['data']['MoveJS'][_0x182411][0x1]<=0x0){eval(this['data']['MoveJS'][_0x182411][0x2]);this['data']['MoveJS'][_0x182411][0x1]=this['data']['MoveJS'][_0x182411][0x3];}else this['data']['MoveJS'][_0x182411][0x1]--;}else this['data']['MoveJS'][_0x182411][0x0]--;}}if(this['UpdateQT'])this['QuickText'](this['data']['UpdateQT']);if(this['MoveQT']){for(let _0x504641=0x0,_0x5b19c9=this['data']['MoveQT']['length'];_0x504641<_0x5b19c9;_0x504641++){if(this['data']['MoveQT'][_0x504641][0x0]<=0x0){if(this['data']['MoveQT'][_0x504641][0x1]<=0x0){this['QuickText'](this['data']['MoveQT'][_0x504641][0x2]);this['data']['MoveQT'][_0x504641][0x1]=this['data']['MoveQT'][_0x504641][0x3];}else this['data']['MoveQT'][_0x504641][0x1]--;}else this['data']['MoveQT'][_0x504641][0x0]--;}}if(this['dead'])return;if(!this['Bit'])this['updateCollision']();this['xyRem']['push']([this['x'],this['y'],this['rotationMove']]);this['time']++;switch(this['max'][0x0]){case 0x0:if(this['time']>=this['max'][0x1]){this['setDeadDisappear']();break;}case 0x1:if($gameSelfSwitches['value']([this['max'][0x1],this['max'][0x2],this['max'][0x3]])==this['max'][0x4]){this['setDeadDisappear']();break;}case 0x2:if($gameSwitches['value'](this['max'][0x1])==this['max'][0x2]){this['setDeadDisappear']();break;}case 0x3:if(!!eval(this['max'][0x1])==this['max'][0x2]){this['setDeadDisappear']();break;}}};Game_QJBullet['prototype']['actionAndDead']=function(_0x311020){if(this['dead'])return;if(this['rememberEvent']['indexOf'](_0x311020)!=-0x1)return;this['pierce']-=0x1;this['rememberEvent']['push'](_0x311020);if(this['PierceAction']||this['pierce']<0x0)this['setAction'](_0x311020);if(this['pierce']<0x0){this['dead']=!![];this['deadMode']=0x0;this['startDeadQTJS'](this['deadMode']);}if(this['PierceAnim']||this['pierce']<0x0)this['requestAnimationQJB'](this['deadMode']);};Game_QJBullet['prototype']['setDead']=function(){if(this['dead'])return;this['dead']=!![];this['deadMode']=0x1;if(this['DeadAction'])this['setAction']();if(this['DeadAnim'])this['requestAnimationQJB'](this['deadMode']);this['startDeadQTJS'](this['deadMode']);};Game_QJBullet['prototype']['setDeadDisappear']=function(){if(this['dead'])return;this['dead']=!![];this['deadMode']=0x2;if(this['NoCollisionAction'])this['setAction']();if(this['NoCollisionAnim'])this['requestAnimationQJB'](this['deadMode']);this['startDeadQTJS'](this['deadMode']);};Game_QJBullet['prototype']['setDirectDead']=function(){if(this['dead'])return;this['dead']=!![];this['deadMode']=0x3;this['startDeadQTJS'](this['deadMode']);};Game_QJBullet['prototype']['startDeadQTJS']=function(_0x2bfcff){if(this['DeadJS'])eval(this['data']['DeadJS']);if(this['DeadQT'])this['QuickText'](this['data']['DeadQT']);if(this['afterImage']['length']>0x0){this['delayDelete']=this['afterImage'][0x4]?this['afterImage'][0x4]:this['afterImage'][0x2];}};Game_QJBullet['prototype']['QuickText']=function(_0x4c56c6){if(!_0x1577eb[String(_0x4c56c6)]){console['log']('Preset\x20'+_0x4c56c6+'\x20not\x20exist');return;}_0x1577eb[_0x4c56c6]['call'](this);};Game_QJBullet['prototype']['setAction']=function(_0x2a9ea0){if(this['atkRange']>0x0)this['atkRangeTarget'](_0x2a9ea0);else{QJ['BL']['startAction'](this,_0x2a9ea0);}};Game_QJBullet['prototype']['requestAnimationQJB']=function(_0x241a44){let _0x251d32=$gameMap['findBulletSprite'](this);if(_0x251d32){if(typeof this['animation']=='object'){let _0x21d3d0;if(_0x241a44==0x0){_0x21d3d0=Number(this['animation'][0x0]);}else if(_0x241a44==0x1){_0x21d3d0=Number(this['animation'][0x1]);}else if(_0x241a44==0x2){_0x21d3d0=Number(this['animation'][0x2]);}if(_0x21d3d0<=0x0||!_0x21d3d0){}else if(_0x21d3d0>0x0&&$dataAnimations[_0x21d3d0]){_0x251d32['startAnimation']($dataAnimations[_0x21d3d0],![],0x0);}}else{if(Number(this['animation'])>0x0&&$dataAnimations[Number(this['animation'])]){_0x251d32['startAnimation']($dataAnimations[Number(this['animation'])],![],0x0);}}}};Game_QJBullet['prototype']['atkRangeTarget']=function(_0x2acdb3){let _0x288d8a;for(let _0x192333=0x0,_0x20a815=this['target']['length'];_0x192333<_0x20a815;_0x192333++){if(typeof this['target'][_0x192333]=='object'){if(this['target'][_0x192333][0x0]==_0x2acdb3){_0x288d8a=_0x192333;break;}}else{if(this['target'][_0x192333]==_0x2acdb3){_0x288d8a=_0x192333;break;}}}let _0x11d2f2=this['x'],_0x26fe05=this['y'],_0x4c3b7b=Math['pow'](this['atkRange'],0x2);if(_0x288d8a!=-0x1)this['target']['splice'](_0x288d8a,0x1);for(let _0x4ccda4=0x0,_0x1a58df,_0x432ae9;_0x4ccda4<this['target']['length'];_0x4ccda4++){if(typeof this['target'][_0x4ccda4]=='object'){_0x1a58df=this['target'][_0x4ccda4][0x0]==0x0?$gamePlayer:$gameMap['event'](this['target'][_0x4ccda4][0x0]);_0x432ae9=!![];}else{_0x1a58df=this['target'][_0x4ccda4]==0x0?$gamePlayer:$gameMap['event'](this['target'][_0x4ccda4]);_0x432ae9=![];}if(!_0x1a58df)continue;if(Math['pow'](_0x11d2f2-_0x1a58df['boxScreenX'](),0x2)+Math['pow'](_0x26fe05-_0x1a58df['boxScreenY'](),0x2)<=_0x4c3b7b){if(_0x432ae9){if(!eval(this['target'][_0x4ccda4][0x1]))continue;}QJ['BL']['startAction'](this,_0x1a58df);}}};Game_QJBullet['prototype']['JudgeReBound']=function(_0x8386ff,_0x196837,_0x42cf2f){if(this['ReBound']<0x1){this['setDead']();return!![];}else{this['ReBound']--;this['x']-=Math['sign'](_0x8386ff['overlapV']['x'])*(Math['abs'](_0x8386ff['overlapV']['x'])+0x4);this['y']-=Math['sign'](_0x8386ff['overlapV']['y'])*(Math['abs'](_0x8386ff['overlapV']['y'])+0x4);QJ['BL']['setPostion'](this['QJBody'],this['x'],this['y']);if(this['moveType'][0x0]==0x6){let _0x344d6a=_0x196837['pos'],_0x3324d9=_0x42cf2f['pos'];let _0x2667d6=QJ['BL']['calculateAngleByTwoPoint'](_0x3324d9['x'],_0x3324d9['y'],_0x344d6a['x'],_0x344d6a['y']);if(_0x2667d6<_0x42cf2f['dl'])this['RB6S'][0x1]=this['RB6S'][0x1]==-0x1?0x1:-0x1;else if(_0x2667d6<Math['PI']-_0x42cf2f['dl'])this['RB6S'][0x0]=this['RB6S'][0x0]==-0x1?0x1:-0x1;else if(_0x2667d6<Math['PI']+_0x42cf2f['dl'])this['RB6S'][0x1]=this['RB6S'][0x1]==-0x1?0x1:-0x1;else if(_0x2667d6<0x2*Math['PI']-_0x42cf2f['dl'])this['RB6S'][0x0]=this['RB6S'][0x0]==-0x1?0x1:-0x1;else this['RB6S'][0x1]=this['RB6S'][0x1]==-0x1?0x1:-0x1;}else{this['updateSpeed'](this['speed']);let _0x38a50f=this['rotationMove'],_0x28806c=_0x196837['pos'],_0x1a6265=_0x42cf2f['pos'];let _0x36d14d=QJ['BL']['calculateAngleByTwoPoint'](_0x1a6265['x'],_0x1a6265['y'],_0x28806c['x'],_0x28806c['y']);if(_0x36d14d<_0x42cf2f['dl'])this['rotationMove']=Math['PI']-_0x38a50f;else if(_0x36d14d<Math['PI']-_0x42cf2f['dl'])this['rotationMove']=-_0x38a50f;else if(_0x36d14d<Math['PI']+_0x42cf2f['dl'])this['rotationMove']=Math['PI']-_0x38a50f;else if(_0x36d14d<0x2*Math['PI']-_0x42cf2f['dl'])this['rotationMove']=-_0x38a50f;else this['rotationMove']=Math['PI']-_0x38a50f;if(this['rotationMove']>0x2*Math['PI'])this['rotationMove']-=0x2*Math['PI'];if(this['rotationMove']<0x0)this['rotationMove']+=0x2*Math['PI'];}this['updateImgRotation']();return![];}};Game_QJBullet['prototype']['updateCollision']=function(){if(this['noPassDo']){if(!this['noPassBox'])this['noPassBox']=QJ['BL']['box'](0x0,0x0,[0x1,0x30,0x30]);let _0x5ce049=this['QJBody'],_0xdc1a61=this['noPassBox'],_0x2a860e;for(let _0x600bf0=Math['floor']((_0x5ce049['pos']['x']-_0x5ce049['dia'])/0x30),_0xb14aaf=Math['ceil']((_0x5ce049['pos']['x']+_0x5ce049['dia'])/0x30);_0x600bf0<=_0xb14aaf;_0x600bf0++){for(let _0x1a226c=Math['floor']((_0x5ce049['pos']['y']-_0x5ce049['dia'])/0x30),_0x1bcebd=Math['ceil']((_0x5ce049['pos']['y']+_0x5ce049['dia'])/0x30);_0x1a226c<=_0x1bcebd;_0x1a226c++){if($gameMap['isValid'](_0x600bf0,_0x1a226c)&&!$gameMap['_noPassBox'][_0x600bf0][_0x1a226c]){QJ['BL']['setPostion'](_0xdc1a61,_0x600bf0*0x30+0x18,_0x1a226c*0x30+0x18);_0x2a860e=QJ['BL']['judge'](_0x5ce049,_0xdc1a61);if(_0x2a860e['result']&&this['JudgeReBound'](_0x2a860e,_0x5ce049,_0xdc1a61))return;}}}}else{for(let _0x3ae647=0x0,_0x1f8a05=this['regions']['length'];_0x3ae647<_0x1f8a05;_0x3ae647++){let _0x86290d=$gameMap['_regionBox'][this['regions'][_0x3ae647]];if(!_0x86290d)continue;for(let _0x131563=0x0,_0x2fd566=_0x86290d['length'];_0x131563<_0x2fd566;_0x131563++){let _0x27c1b2=QJ['BL']['judge'](this['QJBody'],_0x86290d[_0x131563]);if(_0x27c1b2['result']&&this['JudgeReBound'](_0x27c1b2,this['QJBody'],_0x86290d[_0x131563]))return;}}for(let _0x36a642=0x0,_0x409f09=this['terrains']['length'];_0x36a642<_0x409f09;_0x36a642++){let _0x2b33af=$gameMap['_terrainBox'][this['terrains'][_0x36a642]];if(!_0x2b33af)continue;for(let _0xe38e2b=0x0,_0x5afabd=_0x2b33af['length'];_0xe38e2b<_0x5afabd;_0xe38e2b++){let _0x4e573c=QJ['BL']['judge'](this['QJBody'],_0x2b33af[_0xe38e2b]);if(_0x4e573c['result']&&this['JudgeReBound'](_0x4e573c,this['QJBody'],_0x2b33af[_0xe38e2b]))return;}}}if(this['WaitBaseOnSpeed']==-0x1)return;if(this['WaitBaseOnSpeed']>=0x0&&this['speed']!=this['WaitBaseOnSpeed'])return;this['target']=QJ['BL']['dealTarget'](this['data']['Target']);if(this['target']['length']==0x0)return;for(let _0x1f861f=0x0,_0x5d246e=this['target']['length'],_0x5d172e,_0x29f935;_0x1f861f<_0x5d246e;_0x1f861f++){if(typeof this['target'][_0x1f861f]=='object'){_0x5d172e=QJ['BL']['dealCharacter'](this['target'][_0x1f861f][0x0]);_0x29f935=!![];}else{_0x5d172e=QJ['BL']['dealCharacter'](this['target'][_0x1f861f]);_0x29f935=![];}if(!_0x5d172e)continue;if(QJ['BL']['judge'](this['QJBody'],_0x5d172e['QJBody'])['result']){if(_0x29f935){if(!eval(this['target'][_0x1f861f][0x1]))continue;}this['actionAndDead'](_0x5d172e);if(this['dead'])break;continue;}let _0x430972=this['rememberEvent']['indexOf'](_0x5d172e);if(_0x430972!=-0x1)this['rememberEvent']['splice'](_0x430972,0x1);}};Game_QJBullet['prototype']['colliedWith']=function(_0x536d87){let _0x189786=QJ['BL']['dealCharacter'](_0x536d87);if(!_0x189786)return;return QJ['BL']['judge'](this['QJBody'],_0x189786['QJBody'])['result'];};function _0x38a154(){this['initialize']['apply'](this,arguments);};_0x38a154['prototype']=Object['create'](Sprite_Base['prototype']);_0x38a154['prototype']['constructor']=_0x38a154;_0x38a154['prototype']['initialize']=function(_0x2c09e2){Sprite_Base['prototype']['initialize']['call'](this);this['o']=$gameMap['bullet'](_0x2c09e2);this['opacity']=this['o']['opacity'];this['setColorTone'](this['o']['tone']);if(typeof this['o']['bitmap']=='string'){this['TarBitmap']=null;let _0x4c2d29=this['o']['bitmap']['match'](/\[[^\]]*\]/i);if(_0x4c2d29){let _0x135c23=eval(_0x4c2d29[0x0]);ImageManager['loadBullet'](this['o']['bitmap'])['addLoadListener'](_0x391537=>{if(this['o']['dead'])return;this['TarBitmap']=_0x391537;this['dymaticBitmap']=[0x0,Number(_0x135c23[0x0]),_0x391537['width']/Number(_0x135c23[0x0]),0x0,Number(_0x135c23[0x1]),_0x391537['height']];});}else ImageManager['loadBullet'](this['o']['bitmap'])['addLoadListener'](_0x263b3e=>{if(this['o']['dead'])return;this['TarBitmap']=_0x263b3e;});}else if(typeof this['o']['bitmap']=='object'){let _0x30cd50=this['o']['bitmap'];if(_0x30cd50[0x0]==0x0){this['bitmap']=_0x30cd50[0x2];this['setFrame'](_0x30cd50[0x3],_0x30cd50[0x4],_0x30cd50[0x5],_0x30cd50[0x6]);}if(_0x30cd50[0x0]==0x1){let _0x1063cb=_0x30cd50[0x5],_0x35d983=_0x30cd50[0x6];if(_0x30cd50[0x4]==0x0)this['bitmap']=new Bitmap(_0x1063cb,_0x35d983);else this['bitmap']=new Bitmap(_0x35d983,_0x1063cb);this['bitmap']['fontSize']=Number(_0x30cd50[0x3]);if(typeof _0x30cd50[0x2]==='object'){this['bitmap']['textColor']=QJ['BL']['ColorGrad'](this['bitmap'],_0x30cd50[0x2][0x0],0x0,0x0,_0x1063cb,_0x35d983,_0x30cd50[0x2][0x1]*Math['PI']/0xb4);}else this['bitmap']['textColor']=_0x30cd50[0x2];this['bitmap']['fontItalic']=![];if(typeof _0x30cd50[0x7]==='object'){this['bitmap']['outlineColor']=QJ['BL']['ColorGrad'](this['bitmap'],_0x30cd50[0x7][0x0],0x0,0x0,_0x1063cb,_0x35d983,_0x30cd50[0x7][0x1]*Math['PI']/0xb4);}else this['bitmap']['outlineColor']=_0x30cd50[0x7];this['bitmap']['outlineWidth']=_0x30cd50[0x8];if(_0x30cd50[0x4]==0x0)this['bitmap']['drawText'](_0x30cd50[0x1],0x0,0x0,_0x1063cb,_0x35d983,'center');else if(_0x30cd50[0x4]==0x1)this['bitmap']['drawTextVerticalRow'](_0x30cd50[0x1],0x0,0x0,_0x1063cb,_0x35d983,'center');}if(_0x30cd50[0x0]==0x2){this['bitmap']=ImageManager['loadSystem']('IconSet');this['setIconIndexFrame'](_0x30cd50[0x1]);}}this['QJParentid']=''+this['o']['bitmap'];this['updateBaseData']();};_0x38a154['prototype']['setIconIndexFrame']=function(_0x35cbd1){var _0x4765c9=0x20;var _0x204e14=0x20;var _0x385748=_0x35cbd1%0x10*_0x4765c9;var _0x197c71=Math['floor'](_0x35cbd1/0x10)*_0x204e14;this['setFrame'](_0x385748,_0x197c71,_0x4765c9,_0x204e14);};_0x38a154['prototype']['refresDymaticBitmap']=function(){let _0x31195b=this['dymaticBitmap'];_0x31195b[0x3]++;if(_0x31195b[0x3]==_0x31195b[0x4]){_0x31195b[0x3]=0x0;_0x31195b[0x0]++;if(_0x31195b[0x0]==_0x31195b[0x1])_0x31195b[0x0]=0x0;this['setFrame'](_0x31195b[0x0]*_0x31195b[0x2],0x0,_0x31195b[0x2],_0x31195b[0x5]);}};_0x38a154['prototype']['update']=function(){Sprite_Base['prototype']['update']['call'](this);this['updateBaseData']();if(!this['o']['dead'])this['updateParticles']();if(this['dymaticBitmap'])this['refresDymaticBitmap']();if(this['o']['deadMode']==0x3)return;if(this['o']['dead']){if(this['o']['delayDelete']>0x0){this['o']['delayDelete']--;}else{if(this['o']['opacity']<=0x5){if(!this['isAnimationPlaying']()&&this['children']['length']<=0x0){$gameMap['removeBullet'](this['o']['index']);return;}}}}if(!this['bitmap']){if(this['TarBitmap']){this['bitmap']=this['TarBitmap'];let _0x4e0de3=this['dymaticBitmap'];if(_0x4e0de3)this['setFrame'](_0x4e0de3[0x0]*_0x4e0de3[0x2],0x0,_0x4e0de3[0x2],_0x4e0de3[0x5]);}else return;}};_0x38a154['prototype']['updateafterImage']=function(){let _0x4014f4=this['o']['afterImage'];if(_0x4014f4['length']>0x0){let _0x5dfbd7=_0x4014f4[0x0]['get'](),_0x5a3c0c,_0x3fffe6;if(!_0x4014f4[0x1]['isMode']){_0x5a3c0c=_0x4014f4[0x1]['get']()/0xff;_0x3fffe6=0x0;if(this['o']['delayDelete']>=0x0)_0x3fffe6=(_0x4014f4[0x2]-this['o']['delayDelete'])/_0x4014f4[0x2]*_0x5a3c0c;}else _0x3fffe6=0x1-(_0x4014f4[0x2]-this['o']['delayDelete'])/_0x4014f4[0x2];if(_0x5dfbd7&&this['o']['time']>0x2){let _0x3135b4=0x0;for(let _0x2c8231=this['o']['xyRem'],_0x1b3e99=_0x2c8231['length']-0x1,_0x16cf70=Math['max'](0x0,_0x1b3e99-_0x4014f4[0x2]),_0x554ca7=_0x1b3e99-_0x16cf70,_0x295fa6=$gameMap['displayX']()*0x30-0x30,_0x3b5aaa=$gameMap['displayY']()*0x30,_0x23e8cd,_0x1947dc,_0x36ceea,_0x327b32=Graphics['width']+0x60,_0x317705=Graphics['height']+0x60;_0x1b3e99>_0x16cf70;_0x1b3e99--){_0x3135b4=_0x4014f4[0x3]['getTar'](_0x2c8231['length']-0x1-_0x1b3e99);if(!_0x4014f4[0x3]['isMode'])_0x3135b4=_0x3135b4||this['width'];if(!_0x2c8231[_0x1b3e99][0x3]){_0x2c8231[_0x1b3e99][0x3]=0x1;_0x2c8231[_0x1b3e99][0x4]=Math['sqrt']((_0x2c8231[_0x1b3e99][0x0]-_0x2c8231[_0x1b3e99-0x1][0x0])*(_0x2c8231[_0x1b3e99][0x0]-_0x2c8231[_0x1b3e99-0x1][0x0])+(_0x2c8231[_0x1b3e99][0x1]-_0x2c8231[_0x1b3e99-0x1][0x1])*(_0x2c8231[_0x1b3e99][0x1]-_0x2c8231[_0x1b3e99-0x1][0x1]));_0x2c8231[_0x1b3e99][0x5]=_0x5dfbd7;}if(_0x4014f4[0x1]['isMode']){if(this['o']['delayDelete']>=0x0)_0x23e8cd=_0x4014f4[0x1]['getTar'](_0x2c8231['length']-0x1-_0x1b3e99)/0xff*_0x3fffe6;else _0x23e8cd=_0x4014f4[0x1]['getTar'](_0x2c8231['length']-0x1-_0x1b3e99)/0xff;}else{_0x23e8cd=(_0x1b3e99-_0x16cf70)/_0x554ca7*_0x5a3c0c-_0x3fffe6;}_0x1947dc=_0x2c8231[_0x1b3e99][0x0]-_0x295fa6;_0x36ceea=_0x2c8231[_0x1b3e99][0x1]-_0x3b5aaa;if(_0x23e8cd>0x0&&(_0x36ceea>-0x30&&_0x36ceea<_0x317705&&_0x1947dc>-0x30&&_0x1947dc<_0x327b32)){this['particleParent']['drawAfterImage'](_0x1947dc,_0x36ceea,_0x2c8231[_0x1b3e99][0x2],_0x2c8231[_0x1b3e99][0x5],_0x23e8cd,_0x3135b4,this['o']['moveType'][0x0]==0x6?_0x2c8231[_0x1b3e99][0x4]+0x1:_0x2c8231[_0x1b3e99][0x4]);}}}}};_0x38a154['prototype']['updateParticles']=function(){for(let _0x3370fa of this['o']['Particles']){if(!_0x3370fa)continue;if(_0x3370fa['count']==0x0){let _0x2f3bf2=ImageManager['loadBullet'](_0x3370fa['img']);if(!_0x2f3bf2['isReady']())continue;for(let _0x5b81c5=_0x3370fa['num'];_0x5b81c5>0x0;_0x5b81c5--){this['particleParent']['addChildrenAtId'](new _0x153f34(this,[0x2,_0x3370fa],this['o']));}_0x3370fa['count']=_0x3370fa['wait'];}else _0x3370fa['count']--;}};_0x38a154['prototype']['updateBaseData']=function(){this['x']=this['o']['screenShowX']();this['y']=this['o']['screenShowY']();this['rotation']=this['o']['rotation'];this['scale']['x']=this['o']['scaleX'];this['scale']['y']=this['o']['scaleY'];this['anchor']['x']=this['o']['anchorX'];this['anchor']['y']=this['o']['anchorY'];this['opacity']=this['o']['opacity'];};function _0x153f34(){this['initialize']['apply'](this,arguments);};_0x153f34['prototype']=Object['create'](PIXI['Sprite']['prototype']);_0x153f34['prototype']['constructor']=_0x153f34;_0x153f34['prototype']['initialize']=function(_0x70c403,_0x270691,_0x1794a9){if(_0x270691[0x0]==0x1)this['QJParentid']='qjy1'+Math['floor'](_0x270691[0x5])+Math['floor'](_0x270691[0x6])+_0x270691[0x7];else if(_0x270691[0x0]==0x2)this['QJParentid']='qjy2'+_0x270691[0x1]['img'];this['baseTexture']=_0x541f01[this['QJParentid']]?_0x541f01[this['QJParentid']]:this['createTexture'](_0x270691);this['textureData']=this['baseTexture']?new PIXI['Texture'](this['baseTexture'],new PIXI['Rectangle'](0x0,0x0,0x0,0x0)):null;PIXI['Sprite']['call'](this,this['textureData']);this['rotation']=_0x1794a9['rotationMove'];this['bitType']=_0x270691[0x0];if(this['bitType']==0x1){if(_0x1794a9['moveType'][0x0]==0x6)this['rotation']=_0x1794a9['rM6S'][0x2];else if(_0x1794a9['moveType'][0x0]==0x5||_0x1794a9['moveType'][0x0]==0x8)this['rotation']=_0x1794a9['rotationMove'];else this['rotation']=_0x70c403['rotation'];this['_x']=_0x70c403['x']+$gameMap['displayX']()*0x30;this['_y']=_0x70c403['y']+$gameMap['displayY']()*0x30;this['opacity']=_0x270691[0x4];this['perFade']=Math['max'](this['opacity']/_0x270691[0x3],0x1);this['time']=_0x270691[0x2];this['setFrame'](0x0,0x0,_0x270691[0x5],_0x270691[0x6]);}else if(this['bitType']==0x2){this['data']=_0x270691[0x1];this['_x']=_0x70c403['x']+eval(this['data']['offsetX'])*Math['cos'](_0x70c403['rotation'])-eval(this['data']['offsetY'])*Math['sin'](_0x70c403['rotation'])+$gameMap['displayX']()*0x30;this['_y']=_0x70c403['y']+eval(this['data']['offsetY'])*Math['cos'](_0x70c403['rotation'])-eval(this['data']['offsetX'])*Math['sin'](_0x70c403['rotation'])+$gameMap['displayY']()*0x30;this['rotation']=_0x70c403['rotation']+this['data']['dir']+Math['random']()*this['data']['dirOffset']*0x2-this['data']['dirOffset'];this['opacity']=((this['data']['opacityMax']-this['data']['opacityMin'])*Math['random']()+this['data']['opacityMin'])*0xff;this['perFade']=Math['max'](this['opacity']/this['data']['deadCount'],0x1);this['time']=this['data']['max'];this['sizeManager']=[0x0,0xa,((this['data']['scaleMax']-this['data']['scaleMin'])*Math['random']()+this['data']['scaleMin'])/0xa];this['setScale'](this['sizeManager'][0x0]*this['sizeManager'][0x2]);let _0x25366=this['data']['img']['match'](/\[[^\]]*\]/i);if(_0x25366){let _0x4a2346=eval(_0x25366[0x0]);this['dymaticBitmap']=[0x0,Number(_0x4a2346[0x0]),this['baseTexture']['width']/Number(_0x4a2346[0x0]),0x0,Number(_0x4a2346[0x1]),this['baseTexture']['height']];this['setFrame'](this['dymaticBitmap'][0x0]*this['dymaticBitmap'][0x2],0x0,this['dymaticBitmap'][0x2],this['dymaticBitmap'][0x5]);}else this['setFrame'](0x0,0x0,this['baseTexture']['width'],this['baseTexture']['height']);if(this['data']['moveType']['includes'](';')){this['mTFT']=0x0;let _0x2a7606=this['data']['moveType'];if(_0x2a7606['substr'](_0x2a7606['length']-0x4)=='*t;0'){this['lineMove']=!![];this['moveType']=[-Math['sin'](this['rotation'])*eval(_0x2a7606['substr'](0x0,_0x2a7606['length']-0x4)),Math['cos'](this['rotation'])*eval(_0x2a7606['substr'](0x0,_0x2a7606['length']-0x4))];}else this['moveType']=_0x2a7606['split'](';');}else{this['mTFT']=0x1;let _0xff2026=this['data']['moveType'];if(_0xff2026['substr'](_0xff2026['length']-0x4)=='*t|0'){this['lineMove']=!![];this['moveType']=[-Math['sin'](this['rotation'])*eval(_0xff2026['substr'](0x0,_0xff2026['length']-0x4)),Math['cos'](this['rotation'])*eval(_0xff2026['substr'](0x0,_0xff2026['length']-0x4))];}else this['moveType']=_0xff2026['split']('|');}if(this['moveType']['length']!=0x2){this['moveTypeWrong']();this['data']['moveType']=[0x0,0x0];}}this['anchor']['set'](0.5,0.5);this['updateBaseData']();numberQJY++;};_0x153f34['prototype']['moveTypeWrong']=function(){if(_0x408440)console['warn']('The\x20moveType\x20'+this['data']['moveType']+'\x20of\x20particle\x20is\x20wrong.');};_0x153f34['prototype']['update']=function(){this['updateBaseData']();if(this['time']<=0x0){this['opacity']-=this['perFade'];if(this['opacity']<=0x0){this['parent']['removeChild'](this);numberQJY--;this['destroy']();return;}}this['time']--;};_0x153f34['prototype']['setFrame']=function(_0x173ad7,_0x39afbe,_0x2c5e83,_0x240e94){this['textureData']['frame']=new PIXI['Rectangle'](Math['floor'](_0x173ad7),Math['floor'](_0x39afbe),Math['floor'](_0x2c5e83),Math['floor'](_0x240e94));};_0x153f34['prototype']['setScale']=function(_0x1e12d2){this['scale']=new PIXI['ObservablePoint'](null,null,_0x1e12d2,_0x1e12d2);};_0x153f34['prototype']['updateBaseData']=function(){if(this['bitType']==0x1){this['alpha']=this['opacity']/0xff;this['x']=this['_x']-$gameMap['displayX']()*0x30;this['y']=this['_y']-$gameMap['displayY']()*0x30;}else if(this['bitType']==0x2){if(this['sizeManager'][0x0]<this['sizeManager'][0x1]){this['sizeManager'][0x0]++;this['setScale'](this['sizeManager'][0x0]*this['sizeManager'][0x2]);}this['alpha']=this['opacity']/0xff;if(this['lineMove']){let _0x7d8b8c=this['moveType'],_0x4a4002=this['data']['max']-this['time'];this['x']=_0x7d8b8c[0x0]*_0x4a4002+this['_x']-$gameMap['displayX']()*0x30;this['y']=_0x7d8b8c[0x1]*_0x4a4002+this['_y']-$gameMap['displayY']()*0x30;}else{let _0x3d61e2=this['rotation'],_0xfea0b6=this['moveType'],_0x45aa70=this['data']['max']-this['time'],_0x1c0b46=0x0,_0x575094=0x0;try{if(this['mTFT']==0x0){_0x1c0b46=-0x1*Number(eval(_0xfea0b6[0x0]));_0x575094=Number(eval(_0xfea0b6[0x1]));}else{let _0x141a1a=-0x1*Number(eval(_0xfea0b6[0x0])),_0x3988f6=Number(eval(_0xfea0b6[0x1]));_0x1c0b46=_0x141a1a*Math['cos'](_0x3988f6);_0x575094=_0x141a1a*Math['sin'](_0x3988f6);}}catch(_0xd2b190){this['moveTypeWrong']();_0x1c0b46=0x0;_0x575094=0x0;}if(!_0x1c0b46&&_0x1c0b46!=0x0){_0x1c0b46=0x0;this['moveTypeWrong']();}if(!_0x575094&&_0x575094!=0x0){_0x575094=0x0;this['moveTypeWrong']();}this['x']=_0x1c0b46*Math['sin'](_0x3d61e2)+_0x575094*Math['sin'](_0x3d61e2+Math['PI']/0x2)+this['_x']-$gameMap['displayX']()*0x30;this['y']=-_0x1c0b46*Math['cos'](_0x3d61e2)-_0x575094*Math['cos'](_0x3d61e2+Math['PI']/0x2)+this['_y']-$gameMap['displayY']()*0x30;}let _0x3d299b=this['dymaticBitmap'];if(_0x3d299b){_0x3d299b[0x3]++;if(_0x3d299b[0x3]==_0x3d299b[0x4]){_0x3d299b[0x3]=0x0;_0x3d299b[0x0]++;if(_0x3d299b[0x0]==_0x3d299b[0x1])_0x3d299b[0x0]=0x0;this['setFrame'](_0x3d299b[0x0]*_0x3d299b[0x2],0x0,_0x3d299b[0x2],_0x3d299b[0x5]);}}}};_0x153f34['prototype']['createTexture']=function(_0x56ab29){let _0x5b2971=document['createElement']('canvas');let _0x306eda=_0x5b2971['getContext']('2d');let _0x2a2cb0=null;if(_0x56ab29[0x0]==0x1){_0x5b2971['width']=_0x56ab29[0x5];_0x5b2971['height']=_0x56ab29[0x6];_0x2a2cb0=new PIXI['BaseTexture'](_0x5b2971);_0x2a2cb0['scaleMode']=PIXI['SCALE_MODES']['NEAREST'];_0x2a2cb0['width']=_0x56ab29[0x5];_0x2a2cb0['height']=_0x56ab29[0x6];_0x306eda['save']();_0x306eda['fillStyle']=_0x56ab29[0x7];_0x306eda['fillRect'](0x0,0x0,_0x56ab29[0x5],_0x56ab29[0x6]);_0x306eda['restore']();}else if(_0x56ab29[0x0]==0x2){let _0x36101e=ImageManager['loadBullet'](_0x56ab29[0x1]['img']),_0x550984=_0x36101e['width'],_0x128097=_0x36101e['height'];_0x5b2971['width']=_0x550984;_0x5b2971['height']=_0x128097;_0x2a2cb0=new PIXI['BaseTexture'](_0x5b2971);_0x2a2cb0['scaleMode']=PIXI['SCALE_MODES']['NEAREST'];_0x2a2cb0['width']=_0x550984;_0x2a2cb0['height']=_0x128097;_0x306eda['globalCompositeOperation']='source-over';_0x306eda['drawImage'](_0x36101e['_canvas'],0x0,0x0,_0x550984,_0x128097,0x0,0x0,_0x550984,_0x128097);}_0x2a2cb0['update']();_0x541f01[this['QJParentid']]=_0x2a2cb0;return _0x2a2cb0;};Game_QJLaser['prototype']['initialize']=function(_0x450d39,_0x38f8b5){this['data']=_0x450d39;this['index']=_0x38f8b5;this['setBase']();};Game_QJLaser['prototype']['orginX']=function(){return this['x']+$gameMap['displayX']()*0x30;};Game_QJLaser['prototype']['orginY']=function(){return this['y']+$gameMap['displayY']()*0x30;};Game_QJLaser['prototype']['setBase']=function(){this['bulletMode']=0x1;this['z']=this['data']['z'];this['rotationAuto']=(this['data']['RotationAuto']-0x168)*Math['PI']/0xb4;this['dead']=![];this['rememberEvent']=[];this['target']=null;this['regions']=this['data']['Regions'];this['terrains']=this['data']['Terrains'];this['deadCount']=this['data']['DeadCount'];this['action']=this['data']['Action'];this['rotation']=this['data']['initialRotation'];this['lineList']=[];this['name']=this['data']['name'];this['updateWait']=[this['data']['AtkWait'],this['data']['AtkWait']];this['ReBound']=this['data']['ReBound']+0x1;this['max']=this['data']['Max'];this['time']=0x0;this['noPassDo']=this['data']['noPassDo'];if(this['data']['UpdateJS']['length']>0x0)this['UpdateJS']=!![];this['updateFadeValue']();this['updateXYR'](!![]);};Game_QJLaser['prototype']['updateFadeValue']=function(){this['opacity']=this['data']['Opacity']['get']();this['atkWidth']=this['data']['Width']['get']();this['scaleX']=this['data']['ScaleX']['get']()/0x64;this['MaxLength']=this['data']['MaxLength']['get']();};Game_QJLaser['prototype']['updateXYR']=function(_0x562e20){try{this['x']=QJ['BL']['dealX'](this['data']['x'],null,!![]);this['y']=QJ['BL']['dealY'](this['data']['y'],null,!![]);if(this['data']['RotationAuto']==-0x1||_0x562e20){this['rotation']=QJ['BL']['dealInitialRotation'](this['data']['initialRotation'],null,this['x'],this['y']);}else if(this['data']['RotationAuto']>0x0){this['rotation']+=this['rotationAuto'];}}catch(_0x135804){this['setDead']();return;}this['lineList']=[[this['x'],this['y'],this['rotation']]];for(let _0x5bc1fb=0x0,_0x5eed85=this['lineList'],_0x43461f=0x1,_0x396090=0x0,_0x4c8ea8,_0x3f3697,_0x32dbaa=-0x1,_0x4629fe=-0x1,_0x3a760a=$gameMap['displayX'](),_0x36322a=$gameMap['displayY'](),_0x4cac37=Math['sin'](this['rotation']),_0x4c8a32=-Math['cos'](this['rotation']);_0x396090<this['ReBound'];_0x43461f++){if(_0x43461f>=this['MaxLength']){this['lineList']['push']([_0x5eed85[_0x5bc1fb][0x0]+_0x43461f*_0x4cac37,_0x5eed85[_0x5bc1fb][0x1]+_0x43461f*_0x4c8a32,0x0]);break;}_0x4c8ea8=Math['floor']((_0x5eed85[_0x5bc1fb][0x0]+_0x43461f*_0x4cac37)/0x30+_0x3a760a);_0x3f3697=Math['floor']((_0x5eed85[_0x5bc1fb][0x1]+_0x43461f*_0x4c8a32)/0x30+_0x36322a);if(_0x32dbaa==_0x4c8ea8&&_0x4629fe==_0x3f3697)continue;else{_0x32dbaa=_0x4c8ea8;_0x4629fe=_0x3f3697;}if(!(this['regions']['includes']($gameMap['regionId'](_0x4c8ea8,_0x3f3697))||this['terrains']['includes']($gameMap['terrainTag'](_0x4c8ea8,_0x3f3697))||this['noPassDo']&&!$gameMap['noPassBoxNow'](_0x4c8ea8,_0x3f3697)))continue;_0x4c8ea8=(_0x4c8ea8-_0x3a760a)*0x30+0x18;_0x3f3697=(_0x3f3697-_0x36322a)*0x30+0x18;let _0x48aeab=Math['tan'](_0x5eed85[_0x5bc1fb][0x2]-Math['PI']/0x2),_0x2f1fca=_0x5eed85[_0x5bc1fb][0x1]-_0x48aeab*_0x5eed85[_0x5bc1fb][0x0];let _0x513f3e;if(_0x5eed85[_0x5bc1fb][0x0]<=_0x4c8ea8+0x18&&_0x5eed85[_0x5bc1fb][0x0]>=_0x4c8ea8-0x18){if(_0x5eed85[_0x5bc1fb][0x1]<_0x3f3697)_0x513f3e=[0x8];else _0x513f3e=[0x2];}else if(_0x5eed85[_0x5bc1fb][0x1]<=_0x3f3697+0x18&&_0x5eed85[_0x5bc1fb][0x1]>=_0x3f3697-0x18){if(_0x5eed85[_0x5bc1fb][0x0]<_0x4c8ea8)_0x513f3e=[0x4];else _0x513f3e=[0x6];}else if(_0x5eed85[_0x5bc1fb][0x0]<_0x4c8ea8-0x18&&_0x5eed85[_0x5bc1fb][0x1]<_0x3f3697-0x18){_0x513f3e=[0x4,0x8];}else if(_0x5eed85[_0x5bc1fb][0x0]>_0x4c8ea8+0x18&&_0x5eed85[_0x5bc1fb][0x1]<_0x3f3697-0x18){_0x513f3e=[0x6,0x8];}else if(_0x5eed85[_0x5bc1fb][0x0]<_0x4c8ea8-0x18&&_0x5eed85[_0x5bc1fb][0x1]>_0x3f3697+0x18){_0x513f3e=[0x2,0x4];}else if(_0x5eed85[_0x5bc1fb][0x0]>_0x4c8ea8+0x18&&_0x5eed85[_0x5bc1fb][0x1]>_0x3f3697+0x18){_0x513f3e=[0x2,0x6];}else{this['lineList']['push'](_0x5eed85[_0x5bc1fb]);break;}let _0x5b7606=-0x1,_0x3175fb=-0x1,_0x50fa53;for(let _0x244b1b=0x0;_0x244b1b<_0x513f3e['length'];_0x244b1b++){if(_0x513f3e[_0x244b1b]==0x2){_0x3175fb=_0x3f3697+0x18;_0x5b7606=(_0x3175fb-_0x2f1fca)/_0x48aeab;_0x50fa53=Math['PI']-_0x5eed85[_0x5bc1fb][0x2];if(Math['abs'](_0x5b7606-_0x4c8ea8)<=0x18)break;}else if(_0x513f3e[_0x244b1b]==0x4){_0x5b7606=_0x4c8ea8-0x18;_0x3175fb=_0x48aeab*_0x5b7606+_0x2f1fca;_0x50fa53=0x2*Math['PI']-_0x5eed85[_0x5bc1fb][0x2];if(Math['abs'](_0x3175fb-_0x3f3697)<=0x18)break;}else if(_0x513f3e[_0x244b1b]==0x6){_0x5b7606=_0x4c8ea8+0x18;_0x3175fb=_0x48aeab*_0x5b7606+_0x2f1fca;_0x50fa53=0x2*Math['PI']-_0x5eed85[_0x5bc1fb][0x2];if(Math['abs'](_0x3175fb-_0x3f3697)<=0x18)break;}else if(_0x513f3e[_0x244b1b]==0x8){_0x3175fb=_0x3f3697-0x18;_0x5b7606=(_0x3175fb-_0x2f1fca)/_0x48aeab;_0x50fa53=Math['PI']-_0x5eed85[_0x5bc1fb][0x2];if(Math['abs'](_0x5b7606-_0x4c8ea8)<=0x18)break;}}if(_0x5b7606==-0x1&&_0x3175fb==-0x1){throw new Error('出错');}this['lineList']['push']([_0x5b7606,_0x3175fb,_0x50fa53]);_0x4cac37=Math['sin'](_0x50fa53);_0x4c8a32=-Math['cos'](_0x50fa53);_0x5bc1fb++;_0x43461f=0x1;_0x396090++;}};Game_QJLaser['prototype']['update']=function(){if(this['dead']){if(this['deadCount']==0x0){$gameMap['removeBullet'](this['index']);}else{this['opacity']-=this['perFade'];if(this['opacity']<=0x5)$gameMap['removeBullet'](this['index']);}return;}this['time']++;switch(this['max'][0x0]){case 0x0:if(this['time']>=this['max'][0x1]){this['setDead']();break;}case 0x1:if($gameSelfSwitches['value']([this['max'][0x1],this['max'][0x2],this['max'][0x3]])==this['max'][0x4]){this['setDead']();break;}case 0x2:if($gameSwitches['value'](this['max'][0x1])==this['max'][0x2]){this['setDead']();break;}case 0x3:if(!!eval(this['max'][0x1])==this['max'][0x2]){this['setDead']();break;}}this['updateFadeValue']();if(this['updateWait'][0x0]==0x0){this['updateAtk']();this['updateWait'][0x0]=this['updateWait'][0x1];}else this['updateWait'][0x0]--;if(this['UpdateJS'])eval(this['data']['UpdateJS']);};Game_QJLaser['prototype']['updateAtk']=function(){this['target']=QJ['BL']['dealTarget'](this['data']['Target']);let _0x1bdea5=null;for(let _0x5d03ae=this['lineList'],_0x161eb7=0x0,_0x2ceafd=_0x5d03ae['length']-0x1;_0x161eb7<_0x2ceafd;_0x161eb7++){let _0x53e803=Math['sqrt']((_0x5d03ae[_0x161eb7][0x0]-_0x5d03ae[_0x161eb7+0x1][0x0])*(_0x5d03ae[_0x161eb7][0x0]-_0x5d03ae[_0x161eb7+0x1][0x0])+(_0x5d03ae[_0x161eb7][0x1]-_0x5d03ae[_0x161eb7+0x1][0x1])*(_0x5d03ae[_0x161eb7][0x1]-_0x5d03ae[_0x161eb7+0x1][0x1]));if(_0x53e803<=0x2)continue;_0x1bdea5=QJ['BL']['box']((_0x5d03ae[_0x161eb7][0x0]+_0x5d03ae[_0x161eb7+0x1][0x0])/0x2+$gameMap['displayX']()*0x30,(_0x5d03ae[_0x161eb7][0x1]+_0x5d03ae[_0x161eb7+0x1][0x1])/0x2+$gameMap['displayY']()*0x30,[0x1,this['atkWidth'],_0x53e803+0x2]);_0x1bdea5['setAngle'](QJ['BL']['calculateAngleByTwoPoint'](_0x5d03ae[_0x161eb7][0x0],_0x5d03ae[_0x161eb7][0x1],_0x5d03ae[_0x161eb7+0x1][0x0],_0x5d03ae[_0x161eb7+0x1][0x1]));for(let _0x11c400=0x0,_0x23097a=this['target']['length'],_0x4368c1,_0x5e0df0;_0x11c400<_0x23097a;_0x11c400++){if(typeof this['target'][_0x11c400]=='object'){_0x4368c1=QJ['BL']['dealCharacter'](this['target'][_0x11c400][0x0]);_0x5e0df0=!![];}else{_0x4368c1=QJ['BL']['dealCharacter'](this['target'][_0x11c400]);_0x5e0df0=![];}if(!_0x4368c1||!_0x4368c1['QJBody'])continue;if(QJ['BL']['judge'](_0x1bdea5,_0x4368c1['QJBody'])['result']){if(_0x5e0df0){if(!eval(this['target'][_0x11c400][0x1]))continue;}QJ['BL']['startAction'](this,_0x4368c1);continue;}let _0x571cf3=this['rememberEvent']['indexOf'](_0x4368c1);if(_0x571cf3!=-0x1)this['rememberEvent']['splice'](_0x571cf3,0x1);}}};Game_QJLaser['prototype']['destroy']=function(){this['judgeBody']=null;};Game_QJLaser['prototype']['setDead']=function(){this['dead']=!![];this['perFade']=Math['max'](this['opacity']/this['deadCount'],0x1);};Game_QJLaser['prototype']['xs']=function(){return 0x0;};Game_QJLaser['prototype']['ys']=function(){return 0x0;};Game_QJLaser['prototype']['screenShowX']=function(){return this['x']-$gameMap['displayX']()*0x30;};Game_QJLaser['prototype']['screenShowY']=function(){return this['y']-$gameMap['displayY']()*0x30;};function _0x693033(){this['initialize']['apply'](this,arguments);};_0x693033['prototype']=Object['create'](Sprite_Base['prototype']);_0x693033['prototype']['constructor']=_0x693033;_0x693033['prototype']['initialize']=function(_0x21b3e6){Sprite_Base['prototype']['initialize']['call'](this);this['o']=$gameMap['bullet'](_0x21b3e6);let _0xe27ec7;let _0x355d8b=this['o']['data']['Img'];let _0x467540=this['o']['data']['ImgPoint'];_0xe27ec7=_0x355d8b['match'](/\[[^\]]*\]/i);if(_0xe27ec7){let _0x465cc4=eval(_0xe27ec7[0x0]);ImageManager['loadBullet'](_0x355d8b)['addLoadListener'](_0x4fe06f=>{if(this['o']['dead'])return;this['lineBit']=_0x4fe06f;this['lineBit']['smooth']=![];this['dymaticBitmapLine']=[0x0,Number(_0x465cc4[0x0]),_0x4fe06f['width']/Number(_0x465cc4[0x0]),0x0,Number(_0x465cc4[0x1]),_0x4fe06f['height']];this['drawRectangleLine']=[0x0,0x0,0x0,0x0];this['refresDymaticBitmapLine']();});}else ImageManager['loadBullet'](_0x355d8b)['addLoadListener'](_0x5b67a7=>{if(this['o']['dead'])return;this['lineBit']=_0x5b67a7;this['lineBit']['smooth']=!![];this['drawRectangleLine']=[0x0,0x0,_0x5b67a7['width'],_0x5b67a7['height']];});_0xe27ec7=_0x467540['match'](/\[[^\]]*\]/i);if(_0xe27ec7){let _0x35190a=eval(_0xe27ec7[0x0]);ImageManager['loadBullet'](_0x467540)['addLoadListener'](_0x240de8=>{if(this['o']['dead'])return;this['pointBit']=_0x240de8;this['dymaticBitmapPoint']=[0x0,Number(_0x35190a[0x0]),_0x240de8['width']/Number(_0x35190a[0x0]),0x0,Number(_0x35190a[0x1]),_0x240de8['height']];this['drawRectanglePoint']=[0x0,0x0,0x0,0x0];this['refresDymaticBitmapPoint']();});}else ImageManager['loadBullet'](_0x467540)['addLoadListener'](_0xca31ea=>{if(this['o']['dead'])return;this['pointBit']=_0xca31ea;this['drawRectanglePoint']=[0x0,0x0,_0xca31ea['width'],_0xca31ea['height']];});};_0x693033['prototype']['refresDymaticBitmapLine']=function(){this['dymaticBitmapLine'][0x3]++;if(this['dymaticBitmapLine'][0x3]==this['dymaticBitmapLine'][0x4]){this['dymaticBitmapLine'][0x3]=0x0;this['dymaticBitmapLine'][0x0]++;if(this['dymaticBitmapLine'][0x0]==this['dymaticBitmapLine'][0x1])this['dymaticBitmapLine'][0x0]=0x0;this['drawRectangleLine']=[this['dymaticBitmapLine'][0x0]*this['dymaticBitmapLine'][0x2],0x0,this['dymaticBitmapLine'][0x2],this['dymaticBitmapLine'][0x5]];}};_0x693033['prototype']['refresDymaticBitmapPoint']=function(){this['dymaticBitmapPoint'][0x3]++;if(this['dymaticBitmapPoint'][0x3]==this['dymaticBitmapPoint'][0x4]){this['dymaticBitmapPoint'][0x3]=0x0;this['dymaticBitmapPoint'][0x0]++;if(this['dymaticBitmapPoint'][0x0]==this['dymaticBitmapPoint'][0x1])this['dymaticBitmapPoint'][0x0]=0x0;this['drawRectanglePoint']=[this['dymaticBitmapPoint'][0x0]*this['dymaticBitmapPoint'][0x2],0x0,this['dymaticBitmapPoint'][0x2],this['dymaticBitmapPoint'][0x5]];}};_0x693033['prototype']['update']=function(){Sprite_Base['prototype']['update']['call'](this);if(!this['lineBit']||!this['pointBit'])return;if(!this['lineList']){let _0x2cdfaf=this['o']['data']['Tone'];this['lineList']=[];this['pointList']=[];for(let _0xef515a=0x0,_0x48f18b,_0x2c2823;_0xef515a<this['o']['ReBound'];_0xef515a++){_0x48f18b=new Sprite(this['lineBit']);_0x2c2823=new Sprite(this['pointBit']);_0x48f18b['setColorTone'](_0x2cdfaf);_0x2c2823['setColorTone'](_0x2cdfaf);_0x48f18b['anchor']['x']=0.5;_0x48f18b['anchor']['y']=0x1;_0x2c2823['anchor']['x']=0.5;_0x2c2823['anchor']['y']=0.5;this['lineList']['push'](_0x48f18b);this['pointList']['push'](_0x2c2823);this['addChild'](_0x48f18b);this['addChild'](_0x2c2823);}let _0xa4814c=new Sprite(this['pointBit']);_0xa4814c['setColorTone'](_0x2cdfaf);_0xa4814c['anchor']['x']=0.5;_0xa4814c['anchor']['y']=0.5;this['pointList']['push'](_0xa4814c);this['addChild'](_0xa4814c);}if(this['dymaticBitmapLine'])this['refresDymaticBitmapLine']();if(this['dymaticBitmapPoint'])this['refresDymaticBitmapPoint']();this['o']['updateXYR']();let _0x530f94=this['o']['scaleX'];let _0x160a35=this['o']['opacity'];let _0x5cf74d=this['o']['lineList'];let _0x36d8d0=this['drawRectangleLine'];let _0x2ce60a=this['drawRectanglePoint'];for(let _0x56c9f1=0x0,_0x4381c4,_0x25dce6,_0x3f9a26=this['o']['ReBound'],_0x2ac77d=_0x5cf74d['length'];_0x56c9f1<_0x3f9a26;_0x56c9f1++){_0x4381c4=this['lineList'][_0x56c9f1];_0x25dce6=this['pointList'][_0x56c9f1];_0x25dce6['x']=_0x5cf74d[_0x56c9f1][0x0];_0x25dce6['y']=_0x5cf74d[_0x56c9f1][0x1];_0x25dce6['setFrame'](_0x2ce60a[0x0],_0x2ce60a[0x1],_0x2ce60a[0x2],_0x2ce60a[0x3]);_0x25dce6['scale']['x']=_0x530f94;_0x25dce6['rotation']=_0x5cf74d[_0x56c9f1][0x2];_0x25dce6['opacity']=_0x160a35;if(!_0x5cf74d[_0x56c9f1+0x1]){_0x4381c4['visible']=![];_0x25dce6['visible']=![];for(let _0x1e3dc5=_0x56c9f1+0x1;_0x1e3dc5<_0x3f9a26;_0x1e3dc5++){this['lineList'][_0x1e3dc5]['visible']=![];this['pointList'][_0x1e3dc5]['visible']=![];}break;}else{_0x4381c4['visible']=!![];_0x25dce6['visible']=!![];}_0x4381c4['x']=_0x5cf74d[_0x56c9f1][0x0];_0x4381c4['y']=_0x5cf74d[_0x56c9f1][0x1];_0x4381c4['setFrame'](_0x36d8d0[0x0],_0x36d8d0[0x1],_0x36d8d0[0x2],_0x36d8d0[0x3]);_0x4381c4['rotation']=_0x5cf74d[_0x56c9f1][0x2];_0x4381c4['scale']['x']=_0x530f94;_0x4381c4['scale']['y']=Math['sqrt']((_0x5cf74d[_0x56c9f1][0x0]-_0x5cf74d[_0x56c9f1+0x1][0x0])*(_0x5cf74d[_0x56c9f1][0x0]-_0x5cf74d[_0x56c9f1+0x1][0x0])+(_0x5cf74d[_0x56c9f1][0x1]-_0x5cf74d[_0x56c9f1+0x1][0x1])*(_0x5cf74d[_0x56c9f1][0x1]-_0x5cf74d[_0x56c9f1+0x1][0x1]))/_0x36d8d0[0x3];_0x4381c4['opacity']=_0x160a35;}let _0x339bdd=this['pointList'][this['pointList']['length']-0x1];_0x339bdd['x']=_0x5cf74d[_0x5cf74d['length']-0x1][0x0];_0x339bdd['y']=_0x5cf74d[_0x5cf74d['length']-0x1][0x1];_0x339bdd['setFrame'](_0x2ce60a[0x0],_0x2ce60a[0x1],_0x2ce60a[0x2],_0x2ce60a[0x3]);_0x339bdd['rotation']=_0x5cf74d[_0x5cf74d['length']-0x2][0x2];_0x339bdd['scale']['x']=_0x530f94;_0x339bdd['opacity']=_0x160a35;};Game_QJTwoPoint['prototype']['initialize']=function(_0x5286ef,_0x46baa9){this['data']=_0x5286ef;this['index']=_0x46baa9;this['setBase']();};Game_QJTwoPoint['prototype']['orginX']=function(){return this['x']+$gameMap['displayX']()*0x30;};Game_QJTwoPoint['prototype']['orginY']=function(){return this['y']+$gameMap['displayY']()*0x30;};Game_QJTwoPoint['prototype']['setBase']=function(){this['bulletMode']=0x2;this['z']=this['data']['z'];this['bitmap']=this['data']['Img'];this['scaleX']=this['data']['scaleX']/0x64;this['opacity']=this['data']['Opacity']['get']();this['tone']=this['data']['Tone'];this['dead']=![];this['deadCount']=this['data']['DeadCount'];this['max']=this['data']['Max'];this['time']=0x0;this['perFade']=Math['max'](this['opacity']/this['deadCount'],0x1);this['rotation']=this['data']['initialRotation'];this['twoPointLength']=0x0;this['action']=this['data']['Action'];this['target']=null;this['updateWait']=[this['data']['AtkWait'],this['data']['AtkWait']];this['rememberEvent']=[];this['name']=this['data']['name'];this['ExtraRotation']=this['data']['ExtraRotation']*Math['PI']/0xb4;this['xyData']=[];_0x4966b=[];_0x5bd225=![];this['xyData'][0x0]=QJ['BL']['calculateGAndGR'](this['data']['x1']);_0x5bd225=!![];this['xyData'][0x1]=QJ['BL']['calculateGAndGR'](this['data']['y1']);_0x4966b=[];_0x5bd225=![];this['xyData'][0x2]=QJ['BL']['calculateGAndGR'](this['data']['x2']);_0x5bd225=!![];this['xyData'][0x3]=QJ['BL']['calculateGAndGR'](this['data']['y2']);if(!this['xyData'][0x0]||!this['xyData'][0x1]||!this['xyData'][0x2]||!this['xyData'][0x3]){this['setDead']();return;}this['updateXYR']();this['updateFadeValue']();};Game_QJTwoPoint['prototype']['updateFadeValue']=function(){this['opacity']=this['data']['Opacity']['get']();this['atkWidth']=this['data']['Width']['get']();this['scaleX']=this['data']['ScaleX']['get']()/0x64;};Game_QJTwoPoint['prototype']['updateXYR']=function(){this['x']=QJ['BL']['dealX'](this['xyData'][0x0],null,!![]);this['y']=QJ['BL']['dealY'](this['xyData'][0x1],null,!![]);this['tarX']=QJ['BL']['dealX'](this['xyData'][0x2],null,!![]);this['tarY']=QJ['BL']['dealY'](this['xyData'][0x3],null,!![]);if(this['x']==null||this['y']==null||this['tarX']==null||this['tarY']==null){$gameMap['removeBullet'](this['index']);return;}this['rotation']=QJ['BL']['calculateAngleByTwoPoint'](this['x'],this['y'],this['tarX'],this['tarY']);this['twoPointLength']=Math['sqrt']((this['x']-this['tarX'])*(this['x']-this['tarX'])+(this['y']-this['tarY'])*(this['y']-this['tarY']));this['rotation']+=this['ExtraRotation'];};Game_QJTwoPoint['prototype']['update']=function(){this['updateXYR']();if(this['dead']){if(this['deadCount']==0x0){$gameMap['removeBullet'](this['index']);}else{this['opacity']-=this['perFade'];if(this['opacity']<=0x5)$gameMap['removeBullet'](this['index']);}return;}this['time']++;switch(this['max'][0x0]){case 0x0:if(this['time']>=this['max'][0x1]){this['setDead']();break;}case 0x1:if($gameSelfSwitches['value']([this['max'][0x1],this['max'][0x2],this['max'][0x3]])==this['max'][0x4]){this['setDead']();break;}case 0x2:if($gameSwitches['value'](this['max'][0x1])==this['max'][0x2]){this['setDead']();break;}case 0x3:if(!!eval(this['max'][0x1])==this['max'][0x2]){this['setDead']();break;}}this['updateFadeValue']();if(this['updateWait'][0x0]==0x0){this['updateAtk']();this['updateWait'][0x0]=this['updateWait'][0x1];}else this['updateWait'][0x0]--;};Game_QJTwoPoint['prototype']['destroy']=function(){this['judgeBody']=null;};Game_QJTwoPoint['prototype']['setDead']=function(){this['dead']=!![];};Game_QJTwoPoint['prototype']['xs']=function(){return this['x'];};Game_QJTwoPoint['prototype']['ys']=function(){return this['y'];};Game_QJTwoPoint['prototype']['screenShowX']=function(){return this['x'];};Game_QJTwoPoint['prototype']['screenShowY']=function(){return this['y'];};Game_QJTwoPoint['prototype']['updateAtk']=function(){this['target']=QJ['BL']['dealTarget'](this['data']['Target']);let _0x4bb0be;if(this['data']['AtkRange']>0x0){_0x4bb0be=QJ['BL']['box'](this['tarX']+$gameMap['displayX']()*0x30,this['tarY']+$gameMap['displayY']()*0x30,[0x0,this['data']['AtkRange']]);}else{let _0x35b4fb=this['twoPointLength'];if(_0x35b4fb<=0x2)return;_0x4bb0be=QJ['BL']['box'](this['x']+$gameMap['displayX']()*0x30,this['y']+$gameMap['displayY']()*0x30,[0x1,this['atkWidth'],_0x35b4fb]);_0x4bb0be['translate'](0x0,-_0x35b4fb/0x2);_0x4bb0be['setAngle'](this['rotation']);}for(let _0x4cc89c=0x0,_0x2b83f4=this['target']['length'],_0x3228c6,_0x2e2e70;_0x4cc89c<_0x2b83f4;_0x4cc89c++){if(typeof this['target'][_0x4cc89c]=='object'){_0x3228c6=QJ['BL']['dealCharacter'](this['target'][_0x4cc89c][0x0]);iextraCondition=!![];}else{_0x3228c6=QJ['BL']['dealCharacter'](this['target'][_0x4cc89c]);_0x2e2e70=![];}if(!_0x3228c6||!_0x3228c6['QJBody'])continue;if(QJ['BL']['judge'](_0x4bb0be,_0x3228c6['QJBody'])['result']){if(_0x2e2e70){if(!eval(this['target'][_0x4cc89c][0x1]))continue;}QJ['BL']['startAction'](this,_0x3228c6);continue;}let _0x1919f9=this['rememberEvent']['indexOf'](_0x3228c6);if(_0x1919f9!=-0x1)this['rememberEvent']['splice'](_0x1919f9,0x1);}};function _0x3d5f58(){this['initialize']['apply'](this,arguments);};_0x3d5f58['prototype']=Object['create'](Sprite_Base['prototype']);_0x3d5f58['prototype']['constructor']=_0x3d5f58;_0x3d5f58['prototype']['initialize']=function(_0x368bb9){Sprite_Base['prototype']['initialize']['call'](this);this['o']=$gameMap['bullet'](_0x368bb9);this['anchor']['x']=0.5;this['anchor']['y']=0x1;this['opacity']=this['o']['opacity'];this['scale']['x']=this['o']['scaleX'];if(typeof this['o']['bitmap']=='string'){let _0x45490c=this['o']['bitmap']['match'](/\[[^\]]*\]/i);if(_0x45490c){let _0x34491b=eval(_0x45490c[0x0]);ImageManager['loadBullet'](this['o']['bitmap'])['addLoadListener'](_0x5c3397=>{if(this['o']['dead'])return;this['bitmap']=_0x5c3397;this['dymaticBitmap']=[0x0,Number(_0x34491b[0x0]),_0x5c3397['width']/Number(_0x34491b[0x0]),0x0,Number(_0x34491b[0x1]),_0x5c3397['height']];this['drawRectangle']=[0x0,0x0,0x0,0x0];this['refresDymaticBitmap']();this['remHeight']=this['bitmap']['height'];let _0x366146=this['dymaticBitmap'];this['setFrame'](_0x366146[0x0]*_0x366146[0x2],0x0,_0x366146[0x2],_0x366146[0x5]);});}else ImageManager['loadBullet'](this['o']['bitmap'])['addLoadListener'](_0x300c03=>{if(this['o']['dead'])return;this['bitmap']=_0x300c03;this['drawRectangle']=[0x0,0x0,_0x300c03['width'],_0x300c03['height']];this['remHeight']=this['bitmap']['height'];});}};_0x3d5f58['prototype']['refresDymaticBitmap']=function(){let _0x56f2f7=this['dymaticBitmap'];_0x56f2f7[0x3]++;if(_0x56f2f7[0x3]==_0x56f2f7[0x4]){_0x56f2f7[0x3]=0x0;_0x56f2f7[0x0]++;if(_0x56f2f7[0x0]==_0x56f2f7[0x1])_0x56f2f7[0x0]=0x0;this['setFrame'](_0x56f2f7[0x0]*_0x56f2f7[0x2],0x0,_0x56f2f7[0x2],_0x56f2f7[0x5]);}};_0x3d5f58['prototype']['update']=function(){Sprite_Base['prototype']['update']['call'](this);if(!this['bitmap'])return;this['x']=this['o']['screenShowX']();this['y']=this['o']['screenShowY']();this['rotation']=this['o']['rotation'];this['opacity']=this['o']['opacity'];this['scale']['y']=this['o']['twoPointLength']/this['remHeight'];if(this['dymaticBitmap'])this['refresDymaticBitmap']();};QJ['BL']['box']=function(_0x5c4673,_0x14c45a,_0x2c14b9){let _0x3adb44=null;if(_0x2c14b9[0x0]==0x0){_0x3adb44=new SATCircle(new SATVector(_0x5c4673,_0x14c45a),_0x2c14b9[0x1]);_0x3adb44['type']=0x0;_0x3adb44['dia']=_0x2c14b9[0x1];}else if(_0x2c14b9[0x0]==0x1){_0x3adb44=new SATPolygon(new SATVector(_0x5c4673,_0x14c45a),[new SATVector(-_0x2c14b9[0x1]/0x2,-_0x2c14b9[0x2]/0x2),new SATVector(+_0x2c14b9[0x1]/0x2,-_0x2c14b9[0x2]/0x2),new SATVector(+_0x2c14b9[0x1]/0x2,+_0x2c14b9[0x2]/0x2),new SATVector(-_0x2c14b9[0x1]/0x2,+_0x2c14b9[0x2]/0x2)]);_0x3adb44['type']=0x1;_0x3adb44['w']=_0x2c14b9[0x1];_0x3adb44['h']=_0x2c14b9[0x2];_0x3adb44['dl']=Math['atan'](_0x3adb44['w']/_0x3adb44['h']);_0x3adb44['dia']=Math['sqrt'](_0x3adb44['w']*_0x3adb44['w']+_0x3adb44['h']*_0x3adb44['h'])/0x2;}return _0x3adb44;};QJ['sat']=new SATResponse();QJ['BL']['judge']=function(_0xfc3d71,_0x5f2aa0){QJ['sat']['clear']();if(_0xfc3d71['type']==0x0&&_0x5f2aa0['type']==0x0){QJ['sat']['result']=SATtestCircleCircle(_0xfc3d71,_0x5f2aa0,QJ['sat']);}else if(_0xfc3d71['type']==0x1&&_0x5f2aa0['type']==0x1){QJ['sat']['result']=SATtestPolygonPolygon(_0xfc3d71,_0x5f2aa0,QJ['sat']);}else if(_0xfc3d71['type']==0x1&&_0x5f2aa0['type']==0x0){QJ['sat']['result']=SATtestPolygonCircle(_0xfc3d71,_0x5f2aa0,QJ['sat']);}else if(_0xfc3d71['type']==0x0&&_0x5f2aa0['type']==0x1){QJ['sat']['result']=SATtestCirclePolygon(_0xfc3d71,_0x5f2aa0,QJ['sat']);}return QJ['sat'];};QJ['BL']['setPostion']=function(_0x184ca7,_0x564861,_0x2bb6c7){_0x184ca7['pos']['x']=_0x564861;_0x184ca7['pos']['y']=_0x2bb6c7;};QJ['BL']['CallEvent']=function(_0x389eeb,_0x1b2bc7){if($gameMap['event'](_0x389eeb))$gameMap['event'](_0x389eeb)['steupTarPageQB'](_0x1b2bc7);};const _0x5a578b=Game_Event['prototype']['initialize'];Game_Event['prototype']['initialize']=function(_0x1834e2,_0x2f3e2e){this['_forceInterpreterQB']=new Array();_0x5a578b['call'](this,_0x1834e2,_0x2f3e2e);};Game_Event['prototype']['steupTarPageQB']=function(_0x1c1982){if(!!this['event']()['pages'][_0x1c1982-0x1])this['_forceInterpreterQB']['push'](new Game_InterpreterForceQBEvent(_0x1c1982-0x1));};const _0x59aeb2=Game_Event['prototype']['updateParallel'];Game_Event['prototype']['updateParallel']=function(){_0x59aeb2['call'](this);for(let _0x4635ce=0x0,_0x5617f2=this['_forceInterpreterQB']['length'];_0x4635ce<_0x5617f2;_0x4635ce++){if(!this['_forceInterpreterQB'][_0x4635ce])continue;if(!this['_forceInterpreterQB'][_0x4635ce]['isRunning']()){this['_forceInterpreterQB'][_0x4635ce]['setup'](this['event']()['pages'][this['_forceInterpreterQB'][_0x4635ce]['pageIndex']]['list'],this['_eventId']);}this['_forceInterpreterQB'][_0x4635ce]['update']();}};QJ['BL']['callCommonEvent']=function(_0x5bb198,_0x26841d,_0x6ef9d1,_0x4a9d3b){$gameMap['steupTarPageQB'](_0x5bb198,_0x26841d,_0x6ef9d1,_0x4a9d3b);};const _0x4068e6=Game_Map['prototype']['initialize'];Game_Map['prototype']['initialize']=function(){_0x4068e6['call'](this);this['_forceInterpreterQB']=new Array();};Game_Map['prototype']['steupTarPageQB']=function(_0x5a8abd,_0x23adbb,_0x4b05d0,_0x2db8af){if(!!$dataCommonEvents[_0x5a8abd])this['_forceInterpreterQB']['push'](new Game_InterpreterForceQBCommonEvent(_0x5a8abd,_0x23adbb,_0x4b05d0,_0x2db8af));};Game_Map['prototype']['clearTarPage']=function(){this['_forceInterpreterQB']=[];for(let _0x3f1ab3 of this['events']()){_0x3f1ab3['_forceInterpreterQB']=[];}};QJ['BL']['dealInitialRotation']=function(_0x5aedae,_0x4c7397,_0x2c6db3,_0x37b793){if(!isNaN(Number(_0x5aedae)))return _0x5aedae*Math['PI']/0xb4;if(_0x5aedae[0x0]=='S'){_0x5aedae=_0x5aedae['substr'](0x2,_0x5aedae['length']-0x3);try{_0x5aedae=eval(_0x5aedae);if(isNaN(Number(_0x5aedae)))return null;return Number(_0x5aedae);}catch(_0x10c331){return null;}}try{_0x5aedae=_0x5aedae['replace'](/PD(\[\])*/ig,_0x1a73ca=>{return QJ['BL']['calculateAngleByDirection']($gamePlayer['direction']())*0xb4/Math['PI'];});_0x5aedae=_0x5aedae['replace'](/EV\[([^\],]*)\]/ig,(_0x541cc5,_0x6c9419)=>{return QJ['BL']['calculateAngleByTwoPoint'](_0x2c6db3,_0x37b793,$gameMap['event']($gameVariables['value'](Number(_0x6c9419)))['boxScreenSubRealX'](),$gameMap['event']($gameVariables['value'](Number(_0x6c9419)))['boxScreenSubRealY']())*0xb4/Math['PI'];});_0x5aedae=_0x5aedae['replace'](/XM\[([^\],]*)\]YM\[([^\],]*)\]/ig,(_0x14e587,_0x1e2cd0,_0x89b7d4)=>{return QJ['BL']['calculateAngleByTwoPoint'](_0x2c6db3,_0x37b793,Number(_0x1e2cd0)*_0x53ad7b+0x18+$gameMap['displayX'](),Number(_0x89b7d4)*_0x53ad7b+0x18+$gameMap['displayY']())*0xb4/Math['PI'];});_0x5aedae=_0x5aedae['replace'](/P(\[\])+/ig,_0x520c7f=>{return QJ['BL']['calculateAngleByTwoPoint'](_0x2c6db3,_0x37b793,$gamePlayer['boxScreenSubRealX'](),$gamePlayer['boxScreenSubRealY']())*0xb4/Math['PI'];});_0x5aedae=_0x5aedae['replace'](/M(\[\])+/ig,_0x4f77c=>{return QJ['BL']['calculateAngleByTwoPoint'](_0x2c6db3,_0x37b793,TouchInput['x']+$gameMap['displayX'](),TouchInput['y']+$gameMap['displayY']())*0xb4/Math['PI'];});_0x5aedae=_0x5aedae['replace'](/D\[([^\],]+)\]/ig,(_0x273058,_0x5049af)=>{return QJ['BL']['calculateAngleByDirection'](_0x5049af==0x0?_0x4c7397['direction']():$gameMap['event'](Number(_0x5049af))['direction']())*0xb4/Math['PI'];});_0x5aedae=_0x5aedae['replace'](/E\[([^\],]+)\]/ig,(_0x4dc4a4,_0x5bcff0)=>{return QJ['BL']['calculateAngleByTwoPoint'](_0x2c6db3,_0x37b793,$gameMap['event'](Number(_0x5bcff0))['boxScreenSubRealX'](),$gameMap['event'](Number(_0x5bcff0))['boxScreenSubRealY']())*0xb4/Math['PI'];});_0x5aedae=_0x5aedae['replace'](/G\[([^\],]+)\]/ig,(_0x2ceb5e,_0xbb7cbf)=>{let _0xce7378=$gameMap['event'](QJ['BL']['getMinEventId'](_0x2c6db3+$gameMap['displayX']()*0x30,_0x37b793+$gameMap['displayY']()*0x30,_0xbb7cbf));return QJ['BL']['calculateAngleByTwoPoint'](_0x2c6db3,_0x37b793,_0xce7378['boxScreenSubRealX'](),_0xce7378['boxScreenSubRealY']())*0xb4/Math['PI'];});_0x5aedae=_0x5aedae['replace'](/N\[([^\],]+)\]/ig,(_0xdbb753,_0x10dc68)=>{let _0x56eb98=$gameMap['event'](QJ['BL']['getMinEventIdNobi'](_0x2c6db3+$gameMap['displayX']()*0x30,_0x37b793+$gameMap['displayY']()*0x30,_0x10dc68));return QJ['BL']['calculateAngleByTwoPoint'](_0x2c6db3,_0x37b793,_0x56eb98['boxScreenSubRealX'](),_0x56eb98['boxScreenSubRealY']())*0xb4/Math['PI'];});_0x5aedae=_0x5aedae['replace'](/X\[([^\],]+)\]Y\[([^\],]+)\]/ig,(_0x4cf083,_0x51fe0e,_0x2c66a1)=>{return QJ['BL']['calculateAngleByTwoPoint'](_0x2c6db3,_0x37b793,Number(_0x51fe0e),Number(_0x2c66a1))*0xb4/Math['PI'];});_0x5aedae=_0x5aedae['replace'](/B\[([^\]]+),([^\]]+)\]/ig,(_0x5353b2,_0x2b74b5,_0x342254)=>{let _0x7b44bc=$gameMap['bullet'](Number(_0x2b74b5));return _0x7b44bc?_0x7b44bc['showRotationLastMove'](Number(_0x342254)):null;});_0x5aedae=eval(_0x5aedae);if(isNaN(Number(_0x5aedae)))return null;return Number(_0x5aedae)*Math['PI']/0xb4;}catch(_0x419d29){return null;}};let _0x4966b=[];let _0x5bd225=![];QJ['BL']['calculateGAndGR']=function(_0x3f8ee9){if(!isNaN(Number(_0x3f8ee9)))return _0x3f8ee9;try{let _0x2acc1b=![];_0x3f8ee9=_0x3f8ee9['replace'](/G\[([^\],]+),([^,]+),([^,]+),([^\],]+),([^\],]+)\]/ig,(_0x2255f,_0x11658,_0x329843,_0x1c8cb3,_0x5c0d84,_0x4c67f0)=>{_0x329843=QJ['BL']['dealX'](_0x329843,null,!![]);_0x1c8cb3=QJ['BL']['dealY'](_0x1c8cb3,null,!![]);let _0x5139fe=QJ['BL']['getMinEventId'](Number(_0x329843)+$gameMap['displayX']()*0x30,Number(_0x1c8cb3)+$gameMap['displayY']()*0x30,_0x11658,Number(_0x4c67f0),Number(_0x5c0d84));if(!_0x5139fe)_0x2acc1b=!![];return _0x5139fe>0x0?'E['+_0x5139fe+']':0x0;});if(_0x2acc1b)return null;_0x3f8ee9=_0x3f8ee9['replace'](/GR\[([^\],]+)\]/ig,(_0x159468,_0x2d3a6e)=>{if(_0x5bd225){return'E['+_0x4966b['shift']()+']';}else{let _0x145096=QJ['BL']['getGroupId'](_0x2d3a6e);let _0x221218=_0x145096[Math['floor'](Math['random']()*_0x145096['length'])];if(!_0x221218)_0x2acc1b=!![];_0x4966b['push'](_0x221218);return _0x221218>0x0?'E['+_0x221218+']':0x0;}});_0x3f8ee9=_0x3f8ee9['replace'](/GRR\[([^\],]+),([^,]+),([^,]+),([^\],]+)\]/ig,(_0x46f294,_0x7cce72,_0x3afd15,_0x585ebe,_0x55687e)=>{if(_0x5bd225){return'E['+_0x4966b['shift']()+']';}else{_0x3afd15=QJ['BL']['dealX'](_0x3afd15,null,!![]);_0x585ebe=QJ['BL']['dealY'](_0x585ebe,null,!![]);let _0x393d38=QJ['BL']['getGroupIdInRange'](_0x7cce72,Number(_0x3afd15),Number(_0x585ebe),Number(_0x55687e));let _0x25dca4=_0x393d38[Math['floor'](Math['random']()*_0x393d38['length'])];if(!_0x25dca4)_0x2acc1b=!![];_0x4966b['push'](_0x25dca4);return _0x25dca4>0x0?'E['+_0x25dca4+']':0x0;}});if(_0x2acc1b)return null;return _0x3f8ee9;}catch(_0x4da0b9){console['log'](_0x4da0b9);return null;}};QJ['BL']['dealX']=function(_0x23a707,_0x211537,_0x359b59){if(!isNaN(Number(_0x23a707)))return _0x23a707;if(!_0x359b59&&_0x23a707[0x0]=='S'){_0x23a707=_0x23a707['substr'](0x2,_0x23a707['length']-0x3);try{_0x23a707=eval(_0x23a707);if(isNaN(Number(_0x23a707)))return null;return Number(_0x23a707);}catch(_0xd55f8f){return null;}}try{_0x23a707=_0x23a707['replace'](/P(\[\])+/ig,_0x3eccd5=>{return $gamePlayer['boxScreenSubRealX']();});_0x23a707=_0x23a707['replace'](/M(\[\])+/ig,_0x44a8fa=>{return TouchInput['x'];});_0x23a707=_0x23a707['replace'](/E\[([^\],]+)\]/ig,(_0x3a9fe0,_0x19abb0)=>{let _0x577570=Number(_0x19abb0)==0x0?_0x211537:$gameMap['event'](Number(_0x19abb0));return _0x577570['boxScreenSubRealX']();});_0x23a707=_0x23a707['replace'](/B\[([^\],]+)\]/ig,(_0x3ecdd4,_0x1bd71d)=>{let _0x372ad5=$gameMap['bullet'](Number(_0x1bd71d));return _0x372ad5?_0x372ad5['screenShowX']():null;});_0x23a707=_0x23a707['replace'](/B\[([^\]]+),([^\]]+)\]/ig,(_0xe61f6b,_0x2babeb,_0xda673d)=>{let _0x125270=$gameMap['bullet'](Number(_0x2babeb));return _0x125270?_0x125270['screenShowXLast'](Number(_0xda673d)):null;});_0x23a707=eval(_0x23a707);if(_0x23a707==null||isNaN(Number(_0x23a707))||!_0x23a707&&_0x23a707!=0x0)return null;return Number(_0x23a707);}catch(_0x421f5f){return null;}};QJ['BL']['dealY']=function(_0x4cc2c1,_0x279494,_0x5d5660){if(!isNaN(Number(_0x4cc2c1)))return _0x4cc2c1;if(!_0x5d5660&&_0x4cc2c1[0x0]=='S'){_0x4cc2c1=_0x4cc2c1['substr'](0x2,_0x4cc2c1['length']-0x3);try{_0x4cc2c1=eval(_0x4cc2c1);if(isNaN(Number(_0x4cc2c1)))return null;return Number(_0x4cc2c1);}catch(_0x421d1b){return null;}}try{_0x4cc2c1=_0x4cc2c1['replace'](/P(\[\])+/ig,_0x12a302=>{return $gamePlayer['boxScreenSubRealY']();});_0x4cc2c1=_0x4cc2c1['replace'](/M(\[\])+/ig,_0x16b335=>{return TouchInput['y'];});_0x4cc2c1=_0x4cc2c1['replace'](/E\[([^\],]+)\]/ig,(_0x3e5fd5,_0x3c6e99)=>{let _0x3bf1d8=Number(_0x3c6e99)==0x0?_0x279494:$gameMap['event'](Number(_0x3c6e99));return _0x3bf1d8['boxScreenSubRealY']();});_0x4cc2c1=_0x4cc2c1['replace'](/B\[([^\],]+)\]/ig,(_0x2552cc,_0x46c37d)=>{let _0x7153d=$gameMap['bullet'](Number(_0x46c37d));return _0x7153d?_0x7153d['screenShowY']():null;});_0x4cc2c1=_0x4cc2c1['replace'](/B\[([^\]]+),([^\]]+)\]/ig,(_0x4a8a21,_0x2feeb1,_0x3634c6)=>{let _0x50dbb2=$gameMap['bullet'](Number(_0x2feeb1));return _0x50dbb2?_0x50dbb2['screenShowYLast'](Number(_0x3634c6)):null;});_0x4cc2c1=eval(_0x4cc2c1);if(_0x4cc2c1==null||isNaN(Number(_0x4cc2c1))||!_0x4cc2c1&&_0x4cc2c1!=0x0)return null;return Number(_0x4cc2c1);}catch(_0x2f0795){return null;}};QJ['BL']['dealMax']=function(_0x571267,_0x1e6e28){if(typeof _0x571267=='number'||!isNaN(Number(_0x571267))){_0x571267=Number(_0x571267);return[0x0,_0x571267==-0x1?0x3b9ac9ff:_0x571267];}else if(_0x571267[0x0]=='S'&&_0x571267[0x1]=='S'){let _0x1450f8=_0x571267['substr'](0x3,_0x571267['length']-0x4)['split'](',');return[0x2,Number(_0x1450f8[0x0])==0x0?_0x1e6e28['_eventId']:Number(_0x1450f8[0x0]),_0x1450f8[0x1],eval(_0x1450f8[0x2])];}else if(_0x571267[0x0]=='S'){let _0x1619b6=_0x571267['substr'](0x2,_0x571267['length']-0x3)['split'](',');return[0x1,$gameMap['mapId'](),Number(_0x1619b6[0x0]),eval(_0x1619b6[0x1])];}else{let _0x1b9f8f=_0x571267['substr'](0x2,_0x571267['length']-0x3);return[0x3,_0x1b9f8f,!![]];}return null;};QJ['BL']['dealZ']=function(_0x5acc66,_0x410c7a){if(typeof _0x5acc66==='number')return'C';else if(_0x5acc66[0x0]=='T')return'T';else if(_0x5acc66[0x0]=='M')return'M';else if(_0x5acc66[0x0]=='C')return'C';else if(_0x5acc66[0x0]=='P')return'P';else return null;};QJ['BL']['dealMoveType']=function(_0x3edc3e,_0x1f663c){if(_0x3edc3e[0x0]=='S')return[0x0];try{if(_0x3edc3e[0x0]=='F'){let _0x16fcba=_0x3edc3e['substr'](0x2,_0x3edc3e['length']-0x3);if(_0x16fcba['includes'](';')){_0x16fcba=_0x16fcba['split'](';');if(_0x16fcba['length']!=0x2)return null;return[0x8,0x0,_0x16fcba[0x0],_0x16fcba[0x1]];}else{_0x16fcba=_0x16fcba['split']('|');if(_0x16fcba['length']!=0x2)return null;return[0x8,0x1,_0x16fcba[0x0],_0x16fcba[0x1]];}}if(_0x3edc3e[0x0]=='C'){return[0x9];}if(_0x3edc3e[0x0]=='B'){let _0x37dd0e=_0x3edc3e['substr'](0x2,_0x3edc3e['length']-0x3)['split'](',');if(Number(_0x37dd0e[0x0])==0x0)_0x37dd0e[0x0]=_0x1f663c['_eventId'];else _0x37dd0e[0x0]=Number(_0x37dd0e[0x0]);if(!_0x37dd0e)return null;return[0x5,_0x37dd0e[0x0],Number(_0x37dd0e[0x1]),Number(_0x37dd0e[0x2]),Number(_0x37dd0e[0x3]),Number(_0x37dd0e[0x4]),Number(_0x37dd0e[0x5]),Number(_0x37dd0e[0x6]),Number(_0x37dd0e[0x7]),Number(_0x37dd0e[0x8])];}if(_0x3edc3e[0x0]=='Q'&&_0x3edc3e[0x1]=='P'){let _0x2723ed=_0x3edc3e['substr'](0x3,_0x3edc3e['length']-0x4)['split'](',');if(!_0x2723ed)return null;return[0x6,Number(eval(_0x2723ed[0x0])),Number(eval(_0x2723ed[0x1])),Number(eval(_0x2723ed[0x2])),Number(eval(_0x2723ed[0x3]))];}if(_0x3edc3e[0x0]!='T')return null;if(_0x3edc3e[0x1]=='E'&&_0x3edc3e[0x2]=='V'){let _0x230e3e=_0x3edc3e['match'](/\[[^\]]*\]/i);if(!_0x230e3e)return null;let _0x67cd14=eval(_0x230e3e[0x0]);return[0x3,Number(_0x67cd14[0x0]),$gameVariables['value'](Number(_0x67cd14[0x1]))];}if(_0x3edc3e[0x1]=='E'){let _0x2aade1=_0x3edc3e['match'](/\[[^\]]*\]/i);if(!_0x2aade1)return null;let _0x3ad64f=eval(_0x2aade1[0x0]);return[0x2,Number(_0x3ad64f[0x0]),Number(_0x3ad64f[0x1])];}if(_0x3edc3e[0x1]=='P'){let _0x76f4bf=_0x3edc3e['match'](/\[[^\]]*\]/i);if(!_0x76f4bf)return null;let _0x1a5e9d=eval(_0x76f4bf[0x0]);return[0x1,Number(_0x1a5e9d[0x0])];}if(_0x3edc3e[0x1]=='G'){let _0x4d3659=_0x3edc3e['substr'](0x3,_0x3edc3e['length']-0x4)['split'](',');if(!_0x4d3659)return null;return[0x4,Number(_0x4d3659[0x0]),String(_0x4d3659[0x1])];}if(_0x3edc3e[0x1]=='N'){let _0x18b8c0=_0x3edc3e['substr'](0x3,_0x3edc3e['length']-0x4)['split'](',');if(!_0x18b8c0)return null;return[0x7,Number(_0x18b8c0[0x0]),String(_0x18b8c0[0x1])];}return null;}catch(_0x646691){return null;}};QJ['BL']['dealTarget']=function(_0x8ace52){let _0x5b07c3=new Array(),_0x590547,_0x3d6f5e,_0xbe3a36;try{for(let _0x1c697d of _0x8ace52){if(typeof _0x1c697d=='object'){_0x3d6f5e=_0x1c697d[0x0];_0xbe3a36=!![];}else{_0x3d6f5e=_0x1c697d;_0xbe3a36=![];}if(_0x3d6f5e[0x0]=='E'&&_0x3d6f5e[0x1]=='V'){_0x590547=eval(_0x3d6f5e['match'](/\[[^\]]*\]/i)[0x0]);if(!_0x590547||isNaN(Number(_0x590547[0x0])))continue;if(_0xbe3a36){_0x5b07c3['push']([$gameVariables['value'](Number(_0x590547[0x0])),_0x1c697d[0x1]]);}else{_0x5b07c3['push']($gameVariables['value'](Number(_0x590547[0x0])));}}else if(_0x3d6f5e[0x0]=='E'){_0x590547=eval(_0x3d6f5e['match'](/\[[^\]]*\]/i)[0x0]);if(!_0x590547||isNaN(Number(_0x590547[0x0])))continue;if(_0xbe3a36){_0x5b07c3['push']([Number(_0x590547[0x0]),_0x1c697d[0x1]]);}else{_0x5b07c3['push'](Number(_0x590547[0x0]));}}else if(_0x3d6f5e[0x0]=='P'){if(_0xbe3a36){_0x5b07c3['push']([-0x1,_0x1c697d[0x1]]);}else{_0x5b07c3['push'](-0x1);}}else if(_0x3d6f5e[0x0]=='G'){_0x590547=_0x3d6f5e['substr'](0x2,_0x3d6f5e['length']-0x3);if(!_0x590547)continue;if(_0xbe3a36){_0x5b07c3=_0x5b07c3['concat'](QJ['BL']['getGroupId'](_0x590547)['map'](_0x15ac04=>{return[_0x15ac04,_0x1c697d[0x1]];}));}else{_0x5b07c3=_0x5b07c3['concat'](QJ['BL']['getGroupId'](_0x590547));}}else if(_0x3d6f5e['includes']('Nobi')){_0x590547=_0x3d6f5e['substr'](0x5,_0x3d6f5e['length']-0x6);if(!_0x590547)continue;if(_0xbe3a36){_0x5b07c3=_0x5b07c3['concat'](QJ['BL']['getCommentId']('['+_0x590547+']')['map'](_0x1a090c=>{return[_0x1a090c,_0x1c697d[0x1]];}));}else{_0x5b07c3=_0x5b07c3['concat'](QJ['BL']['getCommentId']('['+_0x590547+']'));}}}return _0x5b07c3;}catch(_0x57a23f){return null;}};QJ['BL']['dealTime']=function(_0x243c51){if(typeof _0x243c51=='number')return _0x243c51;try{if(_0x243c51[0x0]=='S'&&_0x243c51[0x1]=='S'){let _0x2b2755=_0x243c51['substr'](0x3,_0x243c51['length']-0x4)['split'](',');return[0x0,_0x2b2755[0x0],!!eval(_0x2b2755[0x1])];}else if(_0x243c51[0x0]=='S'){let _0xf908ee=_0x243c51['substr'](0x2,_0x243c51['length']-0x3)['split'](',');return[0x1,Number(_0xf908ee[0x0]),!!eval(_0xf908ee[0x1])];}else if(_0x243c51[0x0]=='T'){let _0x2ffe06=_0x243c51['substr'](0x2,_0x243c51['length']-0x3);return[0x2,_0x2ffe06];}return[0x0,''];}catch(_0x327ddc){return[0x0,''];}};QJ['BL']['dealTimeBoolean']=function(_0x2aa25c,_0x556bbb){if(typeof _0x2aa25c=='number')return _0x2aa25c<=0x0;try{if(_0x2aa25c[0x0]==0x0){return $gameSelfSwitches['value']([$gameMap['mapId'](),_0x556bbb['_eventId'],_0x2aa25c[0x1]])==_0x2aa25c[0x2];}else if(_0x2aa25c[0x0]==0x1){return $gameSwitches['value'](_0x2aa25c[0x1])==_0x2aa25c[0x2];}else if(_0x2aa25c[0x0]==0x2){return!!eval(_0x2aa25c[0x1]);}return![];}catch(_0x33b08d){return![];}};QJ['BL']['startAction']=function(_0x23998e,_0x5a094d){let _0x4cd9d7=_0x23998e['action'],_0x34661d=0x0;if(_0x5a094d){if(_0x5a094d==$gamePlayer)_0x34661d=-0x1;else if(_0x5a094d['_eventId']>0x0)_0x34661d=_0x5a094d['_eventId'];}let _0x565238=_0x23998e['screenShowX'](),_0x4f5b70=_0x23998e['screenShowY'](),_0x2b2e89=_0x23998e['rotation'];if(typeof _0x4cd9d7==='string')_0x4cd9d7=[_0x4cd9d7];for(let _0x434a79 of _0x4cd9d7){if(typeof _0x434a79==='object'){if(_0x434a79[0x0]=='C'){QJ['BL']['callCommonEvent'](Number(_0x434a79[0x1]),_0x34661d,_0x434a79,{'x':_0x565238,'y':_0x4f5b70,'r':_0x2b2e89,'extra':_0x23998e['commonEventExtraData']||{},'bullet':_0x23998e});}}else if(_0x434a79[0x0]=='C'&&_0x434a79[0x1]=='P'&&_0x34661d!=0x0){let _0x124fcf=eval(_0x434a79['match'](/\[[^\]]*\]/i)[0x0]);if(!_0x124fcf)return;if(isNaN(Number(_0x124fcf[0x0])))return;if(Number(_0x124fcf[0x0])<=0x0||!Number['isInteger'](_0x124fcf[0x0]))return;QJ['BL']['CallEvent'](_0x34661d,Number(_0x124fcf[0x0]));}else if(_0x434a79[0x0]=='C'){let _0x3afa04=eval(_0x434a79['match'](/\[[^\]]*\]/i)[0x0]);if(!_0x3afa04)return;if(isNaN(Number(_0x3afa04[0x0])))return;if(Number(_0x3afa04[0x0])<=0x0||!Number['isInteger'](_0x3afa04[0x0]))return;QJ['BL']['callCommonEvent'](Number(_0x3afa04[0x0]),_0x34661d,_0x3afa04,{'x':_0x565238,'y':_0x4f5b70,'r':_0x2b2e89,'extra':_0x23998e['commonEventExtraData']||{},'bullet':_0x23998e});}else if(_0x434a79[0x0]=='S'&&_0x434a79[0x1]=='S'&&_0x34661d!=0x0){let _0xea5347=_0x434a79['substr'](0x3,_0x434a79['length']-0x4)['split'](',');let _0x8245b9=[$gameMap['mapId'](),_0x34661d,_0xea5347[0x0]];let _0x18f0d9=_0xea5347[0x1]=='true'?!![]:![];$gameSelfSwitches['setValue'](_0x8245b9,_0x18f0d9);}else if(_0x434a79[0x0]=='S'){let _0x1ccd66=eval(_0x434a79['match'](/\[[^\]]*\]/i)[0x0]);if(!_0x1ccd66)return;if(isNaN(Number(_0x1ccd66[0x0])))return;if(Number(_0x1ccd66[0x0])<=0x0||!Number['isInteger'](_0x1ccd66[0x0]))return;$gameSwitches['setValue'](Number(_0x1ccd66[0x0]),_0x1ccd66[0x1]);}else if(_0x434a79[0x0]=='E'){if(_0x5a094d['_eventId']>0x0)_0x5a094d['erase']();}else if(_0x434a79[0x0]=='T'){let _0x76f180=_0x434a79['substr'](0x2,_0x434a79['length']-0x3);eval(_0x76f180);}}};QJ['BL']['DirectAction']=function(_0x15ed13,_0x37dd57,_0x424724,_0x3c9440,_0x54b772,_0x30d19b){let _0x4aeeb3=QJ['BL']['getEvent']();_0x4966b=[];_0x5bd225=![];let _0x32125a=QJ['BL']['dealX'](_0x15ed13,_0x4aeeb3);_0x5bd225=!![];let _0x776c8d=QJ['BL']['dealY'](_0x37dd57,_0x4aeeb3);_0x15ed13=_0x32125a+$gameMap['displayX']()*_0x53ad7b;_0x37dd57=_0x776c8d+$gameMap['displayY']()*_0x53ad7b;let _0x185948=QJ['BL']['box'](_0x15ed13,_0x37dd57,QJ['BL']['dealCollisionBox'](_0x424724));QJ['BL']['sprite']['aBody'](_0x185948);_0x54b772=QJ['BL']['dealTarget'](_0x54b772);let _0xa8a203=[];_0x30d19b=_0x30d19b||[];for(let _0x4dffa6=0x0,_0x8ffda0=_0x54b772['length'];_0x4dffa6<_0x8ffda0;_0x4dffa6++){let _0x19a0b1=null;_0x19a0b1=QJ['BL']['dealCharacter'](_0x54b772[_0x4dffa6]);if(!_0x19a0b1)continue;if(_0x30d19b['includes'](_0x19a0b1))continue;if(QJ['BL']['judge'](_0x185948,_0x19a0b1['QJBody'])['result']){_0xa8a203['push'](_0x19a0b1);QJ['BL']['startAction']({'action':_0x3c9440,'screenShowX':()=>{return _0x32125a;},'screenShowY':()=>{return _0x776c8d;},'rotation':0x0},_0x19a0b1);}}return _0xa8a203;};QJ['BL']['dealParticles']=function(_0x3c0d9e){if(typeof _0x3c0d9e!=='object'||_0x3c0d9e['length']==null||_0x3c0d9e['length']==undefined)return[];for(let _0x4ed0e6 in _0x3c0d9e){if(typeof _0x3c0d9e[_0x4ed0e6]=='string'){try{_0x3c0d9e[_0x4ed0e6]=JsonEx['parse'](_0x3c0d9e[_0x4ed0e6]);}catch(_0x5c2649){_0x3c0d9e[_0x4ed0e6]=null;}}else if(typeof _0x3c0d9e[_0x4ed0e6]!=='object')_0x3c0d9e[_0x4ed0e6]=null;if(!_0x3c0d9e[_0x4ed0e6])continue;let _0x426906={'img':null,'offsetX':0x0,'offsetY':0x0,'dir':Math['PI'],'dirOffset':Math['PI']/0x6,'max':0x1e,'deadCount':0x3c,'opacityMin':0.5,'opacityMax':0x1,'scaleMin':0.5,'scaleMax':1.5,'moveType':'-8*t;0','wait':0x2,'num':0x1};for(let _0x8ec5d6 in _0x3c0d9e[_0x4ed0e6])_0x426906[_0x8ec5d6]=_0x3c0d9e[_0x4ed0e6][_0x8ec5d6];_0x426906['count']=_0x426906['wait'];_0x3c0d9e[_0x4ed0e6]=_0x426906;};return _0x3c0d9e;};QJ['BL']['Shooter_FlameThrower']=function(_0x2a6cf1,_0x1db4b2,_0x4b3f5a,_0x11aed1,_0x40f6e1){let _0x3aeaeb={'Img':'fire[11,5]','Max':0x50,'DeadCount':0x28,'AnchorX':0.5,'AnchorY':0.5};for(let _0xe6c7a4 in _0x2a6cf1)_0x3aeaeb[_0xe6c7a4]=_0x2a6cf1[_0xe6c7a4];for(let _0x2d8410=0x0;_0x2d8410<_0x40f6e1;_0x2d8410++){let _0x4b51f1=_0x1db4b2+Math['random']()*(_0x4b3f5a-_0x1db4b2);_0x3aeaeb['initialRotation']=(_0x2a6cf1['initialRotation']!=undefined?_0x2a6cf1['initialRotation']:'PD[]')+'+'+(Math['random']()*_0x11aed1*0x2-_0x11aed1);_0x3aeaeb['Speed']=1.5+Math['random']()*1.5;_0x3aeaeb['CollisionBox']='R['+_0x4b51f1+','+_0x4b51f1+']';_0x3aeaeb['scaleX']=_0x4b51f1;_0x3aeaeb['scaleY']=_0x4b51f1;QJ['BL']['Shoot'](_0x3aeaeb);}};QJ['BL']['Shooter_Gain']=function(_0x14eb44,_0x5e7212,_0x2e288a,_0x15e5bb){_0x14eb44['x']='E[0]';_0x14eb44['y']='E[0]';_0x14eb44['Target']=['P[]'];_0x14eb44['Max']=0x5a+0x3c*0x3c*0x3c;_0x14eb44['initialRotation']=0x3c*Math['random']()-0x1e+(Math['random']()>0.5?0x5a:0x10e);_0x14eb44['RotationAuto']=0x0;_0x14eb44['CollisionBox']='R[32,32]';let _0x5ada9f;if(_0x5e7212==0x3||_0x5e7212=='gold'){_0x14eb44['Img']=[0x2,_0x2e288a];if(Imported['MOG_TreasurePopup']&&(Moghunter['trpopup_GoldVisible']==='true'&&$gameSystem['_trspupVisible'])){if(_0x15e5bb>0x0||_0x15e5bb<0x0&&Moghunter['trpopup_LostItemVisible'])_0x14eb44['Action']=['T[$gameParty.gainGold('+_0x15e5bb+');'+'$gameSystem._trspupData.push(['+null+','+_0x15e5bb+',bullet.screenShowX(),bullet.screenShowY()]);]'];}else _0x14eb44['Action']=['T[$gameParty.gainGold('+_0x15e5bb+');]'];}else{if(_0x5e7212==0x0||_0x5e7212=='item')_0x5ada9f='$dataItems['+_0x2e288a+']';else if(_0x5e7212==0x1||_0x5e7212=='weapon')_0x5ada9f='$dataWeapons['+_0x2e288a+']';else if(_0x5e7212==0x2||_0x5e7212=='armor')_0x5ada9f='$dataArmors['+_0x2e288a+']';else{console['log']('Command\x20parameter\x20error\x20of\x20projected\x20item.');return;}_0x14eb44['Img']=[0x2,eval(_0x5ada9f)['iconIndex']];if(Imported['MOG_TreasurePopup']&&$gameSystem['_trspupVisible']){if(_0x15e5bb>0x0||_0x15e5bb<0x0&&Moghunter['trpopup_LostItemVisible'])_0x14eb44['Action']=['T[$gameParty.gainItem('+_0x5ada9f+','+_0x15e5bb+');'+'$gameSystem._trspupData.push(['+_0x5ada9f+','+_0x15e5bb+',bullet.screenShowX(),bullet.screenShowY()]);]'];}else _0x14eb44['Action']=['T[$gameParty.gainItem('+_0x5ada9f+','+_0x15e5bb+');]'];}_0x14eb44['UpdateJS']='if\x20(this.moveType[4]==0&&this.QJBody)\x20{'+'\x20\x20\x20\x20if\x20(this.itemOffset==undefined)\x20this.itemOffset\x20=\x2030;'+'\x20\x20\x20\x20this.itemOffset--;'+'\x20\x20\x20\x20if\x20(this.itemOffset>=15)\x20this.anchorY+=0.1/15;'+'\x20\x20\x20\x20else\x20this.anchorY-=0.1/15;'+'\x20\x20\x20\x20if\x20(this.itemOffset==0)\x20this.itemOffset=30;'+'}';_0x14eb44['AtkRange']=0x0;_0x14eb44['WaitBaseOnSpeed']=-0x2;QJ['BL']['Shooter_HandGrenade'](_0x14eb44,0x10,0x5,0x5);};QJ['BL']['Shooter_CharacterAtk']=function(_0x4a37e6,_0x5d88cf,_0x6d2403,_0x18cf6d){let _0x5434af=_0x4a37e6==-0x1?$gamePlayer:_0x4a37e6==0x0?QJ['BL']['getEvent']():$gameMap['event'](_0x4a37e6);if(!_0x5434af)return;let _0x5137bd=QJ['BL']['calculateAngleByDirection'](_0x5434af['direction']())*0xb4/Math['PI'];let _0x194ad1=_0x6d2403[_0x5434af['direction']()-0x2],_0x125ed0=_0x6d2403[_0x5434af['direction']()-0x1];if(_0x18cf6d){let _0x56a652=(_0x18cf6d[0x1]-_0x18cf6d[0x0])/_0x18cf6d[0x2];for(let _0x1164ee=_0x18cf6d[0x0];_0x1164ee<_0x18cf6d[0x1];_0x1164ee+=_0x56a652){let _0x4e1a10={'initialRotation':_0x5137bd+_0x1164ee+(Math['random']()-0.5)*_0x18cf6d[0x3],'x':_0x5434af['boxScreenSubX']()+_0x194ad1,'y':_0x5434af['boxScreenSubY']()+_0x125ed0};for(let _0x18e24e in _0x5d88cf)_0x4e1a10[_0x18e24e]=_0x5d88cf[_0x18e24e];QJ['BL']['Shoot'](_0x4e1a10);}}else{let _0x814daf={'initialRotation':_0x5137bd,'x':_0x5434af['boxScreenSubX']()+_0x194ad1,'y':_0x5434af['boxScreenSubY']()+_0x125ed0};for(let _0x176477 in _0x5d88cf)_0x814daf[_0x176477]=_0x5d88cf[_0x176477];QJ['BL']['Shoot'](_0x814daf);}};QJ['BL']['Shooter_P']=function(_0x303c63,_0x990471,_0x41cb7f,_0x2dffb7,_0x2a4f44,_0x437806,_0x10bc9c,_0x121a56,_0x4b148d){if(_0x4b148d<0x2){QJ['BL']['error']('\x20edgeNum\x20'+_0x4b148d+'\x20');return;}if(_0x2a4f44<0x2){QJ['BL']['error']('\x20edgeNum\x20'+_0x2a4f44+'\x20');return;}let _0x59b739=(_0x3853aa,_0x32ebf2,_0x313b43)=>{return Math['asin'](_0x3853aa*Math['sin'](_0x313b43)/Math['sqrt'](_0x3853aa*_0x3853aa+_0x32ebf2*_0x32ebf2-0x2*_0x3853aa*_0x32ebf2*Math['cos'](_0x313b43)));};let _0x5b4acc=(_0x1d46dd,_0x285fe5,_0x58f453)=>{return Math['sqrt'](_0x1d46dd*_0x1d46dd+_0x285fe5*_0x285fe5-0x2*_0x1d46dd*_0x285fe5*Math['cos'](_0x58f453));};for(let _0x53b1fd=0x0,_0x3fc127=_0x2a4f44-0x1,_0x59acf1=Math['max'](Math['sqrt'](0x2-0x2*Math['cos'](0x2*Math['PI']/_0x4b148d))*_0x990471/(_0x2a4f44-0x1),0x1),_0x128bbd=Math['PI']*(0.5-0x1/_0x4b148d),_0x3982a3=![],_0x47e4cb=(_0x3fc127+0x1)/0x2;_0x53b1fd<_0x3fc127;_0x53b1fd++){if(_0x53b1fd>_0x47e4cb)_0x3982a3=!![];QJ['BL']['Shooter_C'](_0x303c63,_0x5b4acc(_0x53b1fd*_0x59acf1,_0x990471,_0x128bbd),_0x41cb7f,_0x2dffb7,_0x4b148d,_0x437806,_0x10bc9c,_0x121a56,_0x3982a3?-_0x59b739((_0x3fc127-_0x53b1fd)*_0x59acf1,_0x990471,_0x128bbd):_0x59b739(_0x53b1fd*_0x59acf1,_0x990471,_0x128bbd));}};QJ['BL']['Shooter_C']=function(_0x59adb7,_0x40bdaa,_0x407d53,_0x2ed727,_0x1d8205,_0x47d51d,_0x4c4352,_0x3ad576,_0x384dc1){let _0x29f3df=(_0x11d66e,_0x117c31,_0x2576fb,_0x413dde,_0xdfcf80)=>{return'F[-'+_0xdfcf80+'*t+'+_0x11d66e+'*Math.sin(t/'+_0x117c31+'+2*Math.PI*'+_0x2576fb+'/'+_0x413dde+'+'+_0x384dc1+');0+'+_0x11d66e+'*Math.cos(t/'+_0x117c31+'+2*Math.PI*'+_0x2576fb+'/'+_0x413dde+'+'+_0x384dc1+')]';};let _0x5f19f1=QJ['BL']['getEvent']();let _0x46683b=QJ['BL']['dealInitialRotation'](_0x47d51d,_0x5f19f1,QJ['BL']['dealX'](_0x4c4352,_0x5f19f1,![]),QJ['BL']['dealY'](_0x3ad576,_0x5f19f1,![]));_0x2ed727=0x1e/_0x2ed727/Math['PI'];_0x384dc1=_0x384dc1||0x0;let _0x43b130={'initialRotation':_0x46683b*0xb4/Math['PI'],'Max':0x78,'RotationAuto':0x0,'Img':'dart','Regions':[0x1],'x':_0x4c4352,'y':_0x3ad576,'MoveType':'S[]'};for(let _0x2c7e99 in _0x59adb7)_0x43b130[_0x2c7e99]=_0x59adb7[_0x2c7e99];for(let _0x27df20=0x0;_0x27df20<_0x1d8205;_0x27df20++){_0x43b130['MoveType']=_0x29f3df(_0x40bdaa,_0x2ed727,_0x27df20,_0x1d8205,_0x407d53);QJ['BL']['Shoot'](JsonEx['makeDeepCopy'](_0x43b130));}};QJ['BL']['Shooter_ArcRange']=function(_0x2acbe1,_0x36d258,_0x4f767d){for(let _0xcef3dc=_0x4f767d[0x0],_0x165583=(_0x4f767d[0x1]-_0x4f767d[0x0])/_0x4f767d[0x2];_0xcef3dc<_0x4f767d[0x1];_0xcef3dc+=_0x165583){_0x36d258['initialRotation']=_0x2acbe1+'+'+(_0xcef3dc+(Math['random']()-0.5)*_0x4f767d[0x3]);QJ['BL']['Shoot'](JsonEx['makeDeepCopy'](_0x36d258));}};QJ['BL']['Shooter_HandGrenade']=function(_0x52e047,_0x4af700,_0xfb8b86,_0x2da228){let _0x189222={'MoveType':'QP['+_0x4af700+','+Math['PI']/0x3+','+_0xfb8b86+','+_0x2da228+']','Max':_0xfb8b86*(_0x2da228+0x1)*_0x2da228/0x2,'NoCollisionAction':!![],'NoCollisionAnim':!![],'DeadAction':!![],'DeadAnim':!![],'Speed':0x12,'ReBound':0xf423f,'AnchorY':0.5,'AtkRange':0x60,'CollisionBox':'C[16]','WaitBaseOnSpeed':-0x1};for(let _0x5d4eaa in _0x52e047)_0x189222[_0x5d4eaa]=_0x52e047[_0x5d4eaa];QJ['BL']['Shoot'](_0x189222);};QJ['BL']['Shadow']=function(_0x493e7a,_0x497ff0){let _0x107779=_0x493e7a==-0x1?$gamePlayer:_0x493e7a==0x0?QJ['BL']['getEvent']():$gameMap['event'](_0x493e7a);if(!_0x107779)return;let _0x4adb76={'initialRotation':0x0,'x':_0x107779['boxScreenSubRealX'](),'y':_0x107779['boxScreenSubRealY']()+0x18,'Speed':0x0,'Img':[0x0,_0x493e7a],'Bit':!![]};for(let _0x1da706 in _0x497ff0)_0x4adb76[_0x1da706]=_0x497ff0[_0x1da706];QJ['BL']['Shoot'](_0x4adb76);};QJ['BL']['addShadow']=function(_0x152c0c,_0x53b160,_0x4f1cb9,_0x4576d5){let _0x23b884;if(_0x152c0c==-0x1){_0x23b884=$gamePlayer;}else{if(_0x152c0c==0x0)_0x23b884=QJ['BL']['getEvent']();else _0x23b884=$gameMap['event'](_0x152c0c);}_0x23b884['addShadowCircle'](_0x152c0c==0x0?_0x23b884['_eventId']:_0x152c0c,_0x53b160,QJ['BL']['dealTime'](_0x4f1cb9),_0x4576d5);};Bitmap['prototype']['getWAndH']=function(_0x14ef02,_0x308018){var _0x59eb25=this['_context'];_0x59eb25['save']();this['fontSize']=_0x308018;_0x59eb25['font']=this['_makeFontNameText']();var _0x394b33=_0x59eb25['measureText'](_0x14ef02);_0x59eb25['restore']();return _0x394b33;};QJ['BL']['Text']=function(_0x15cc59,_0x1022c8,_0x33a099,_0x569319,_0x6fe859,_0x572225,_0x4ab18b){let _0x1e5aba=_0x572225==-0x1?$gamePlayer:_0x572225==0x0?QJ['BL']['getEvent']():$gameMap['event'](_0x572225);if(!_0x1e5aba)return;let _0x5de942=_0x1e5aba['direction']();let _0xb697c0=new Bitmap(0x1,0x1);let _0x2d66c3=_0xb697c0['getWAndH'](_0x15cc59,_0x33a099),_0x1d0f29;if(_0x5de942==0x2||_0x5de942==0x8){_0x1d0f29='R['+_0x33a099*0x60/0x48+','+(_0x5de942==0x2||_0x5de942==0x8?_0x33a099*0x60/0x48*(_0x15cc59['length']+0x1):_0x2d66c3['width'])+']';}else{_0x1d0f29='R['+(_0x5de942==0x2||_0x5de942==0x8?_0x33a099*0x60/0x48*(_0x15cc59['length']+0x1):_0x2d66c3['width'])+','+_0x33a099*0x60/0x48+']';}let _0x57bb78={'Pierce':0x64,'Speed':0x2,'x':_0x1e5aba['boxScreenSubX']()+(_0x5de942==0x4?-_0x15cc59['length']*(_0x33a099-0x4)/0x48*0x60/0x2:_0x5de942==0x6?_0x15cc59['length']*(_0x33a099-0x4)/0x48*0x60/0x2:0x0),'y':_0x1e5aba['boxScreenSubY']()+(_0x5de942==0x8?-_0x15cc59['length']*(_0x33a099-0x4)/0x48*0x60/0x2:_0x5de942==0x2?_0x15cc59['length']*(_0x33a099-0x4)/0x48*0x60/0x2:0x0),'Img':[0x1,_0x15cc59,_0x1022c8,_0x33a099,_0x5de942==0x2||_0x5de942==0x8?0x1:0x0,_0x33a099*0x60/0x48*(_0x15cc59['length']+0x1),_0x33a099*0x60/0x48,_0x569319,_0x6fe859],'CollisionBox':_0x1d0f29,'AnchorX':0.5,'AnchorY':0.5,'PierceAction':!![],'RotationAuto':0x0,'initialRotation':_0x5de942==0x2?0xb4:_0x5de942==0x4?0x10e:_0x5de942==0x6?0x5a:0x0};for(let _0x4f60b2 in _0x4ab18b)_0x57bb78[_0x4f60b2]=_0x4ab18b[_0x4f60b2];QJ['BL']['Shoot'](_0x57bb78);};QJ['BL']['Pic']=function(_0x2cbaa7){let _0x14641c={'Max':-0x1,'initialRotation':0x0,'AnchorX':0x0,'AnchorY':0x0,'x':0x0,'y':0x0,'Bit':!![],'Speed':0x0};for(let _0x5aee4f in _0x2cbaa7)_0x14641c[_0x5aee4f]=_0x2cbaa7[_0x5aee4f];QJ['BL']['Shoot'](_0x14641c);};QJ['BL']['Shoot']=function(_0x52f621,_0x40aece){let _0x230ff0={'initialRotation':'PD[]','x':'P[]','y':'P[]','z':'C[]','scaleX':0x64,'scaleY':0x64,'MoveType':'S[]','Regions':[],'Terrains':[],'Target':[],'Pierce':0x0,'Img':'bullet0','Anim':0x0,'DeadCount':0x0,'Speed':0xc,'Max':0x78,'RotationAuto':-0x1,'Action':[],'CollisionBox':'R[4,4]','Tone':[0x0,0x0,0x0,0x0],'Opacity':0xff,'AfterImage':[],'Light':[],'Particles':[],'AtkRange':0x0,'DeadAction':![],'PierceAction':![],'NoCollisionAction':![],'DeadAnim':!![],'PierceAnim':![],'NoCollisionAnim':![],'ReBound':![],'AnchorX':0.5,'AnchorY':0x0,'rTRotation':'','WaitBaseOnSpeed':-0x2,'LMD':!![],'Bit':![],'UpdateJS':'','MoveJS':[],'DeadJS':'','UpdateQT':'','MoveQT':[],'DeadQT':'','Name':'','noPassDo':![]};if(!_0x40aece){for(let _0x76d484 in _0x52f621)_0x230ff0[_0x76d484]=_0x52f621[_0x76d484];}else _0x230ff0=_0x52f621;let _0x32cab2=QJ['BL']['getEvent']();_0x230ff0['MoveType']=QJ['BL']['dealMoveType'](_0x230ff0['MoveType'],_0x32cab2);if(_0x230ff0['MoveType'][0x0]==0x9){}else{_0x4966b=[];_0x5bd225=![];_0x230ff0['x']=QJ['BL']['dealX'](_0x230ff0['x'],_0x32cab2);_0x5bd225=!![];_0x230ff0['y']=QJ['BL']['dealY'](_0x230ff0['y'],_0x32cab2);_0x230ff0['initialRotation']=QJ['BL']['dealInitialRotation'](_0x230ff0['initialRotation'],_0x32cab2,_0x230ff0['x'],_0x230ff0['y']);}_0x230ff0['z']=QJ['BL']['dealZ'](_0x230ff0['z'],_0x32cab2);_0x230ff0['CollisionBox']=QJ['BL']['dealCollisionBox'](_0x230ff0['CollisionBox']);if(typeof _0x230ff0['Img']=='object'&&_0x230ff0['Img'][0x0]==0x0&&_0x230ff0['Img'][0x1]==0x0)_0x230ff0['Img'][0x1]=QJ['BL']['getEvent']()['_eventId'];_0x230ff0['scaleX']=new QJFrame('scaleX',_0x230ff0['scaleX'],0x0);_0x230ff0['scaleY']=new QJFrame('scaleY',_0x230ff0['scaleY'],0x0);_0x230ff0['Speed']=new QJFrame('Speed',_0x230ff0['Speed'],0x0);_0x230ff0['Opacity']=new QJFrame('Opacity',_0x230ff0['Opacity'],0x0);_0x230ff0['ReBound']=typeof _0x230ff0['ReBound']=='boolean'?_0x230ff0['ReBound']?0xf423f:0x0:_0x230ff0['ReBound'];_0x230ff0['Max']=QJ['BL']['dealMax'](_0x230ff0['Max'],_0x32cab2);if(QJ['BL']['findNull'](_0x230ff0))return null;return $gameMap['addBullet'](_0x230ff0,0x0);};QJ['BL']['deleteBullet']=function(_0x1b165b){for(let _0x449ab7 of $gameMap['_mapBullets']){if(!_0x449ab7)continue;if(_0x449ab7['bulletMode']!=0x0||!_0x449ab7['data']['Name'])continue;if(_0x449ab7['data']['Name']==_0x1b165b){_0x449ab7['setDirectDead']();}}};QJ['BL']['setBulletDisappear']=function(_0x557d00){for(let _0x306d45 of $gameMap['_mapBullets']){if(!_0x306d45)continue;if(_0x306d45['bulletMode']!=0x0||!_0x306d45['data']['Name'])continue;if(_0x306d45['data']['Name']==_0x557d00){_0x306d45['setDeadDisappear']();}}};QJ['BL']['Quick']=function(_0x43a2cc,_0x17a0b8){if(!_0x40d4b9[String(_0x43a2cc)]){console['log']('Preset\x20'+_0x43a2cc+'\x20not\x20exist');return;}let _0x36e2c1=JsonEx['makeDeepCopy'](_0x40d4b9[String(_0x43a2cc)]);for(let _0x2ebfb3 in _0x17a0b8)_0x36e2c1[_0x2ebfb3]=_0x17a0b8[_0x2ebfb3];QJ['BL']['Shoot'](_0x36e2c1,!![]);};QJ['BL']['Laser']=function(_0x4cea63){let _0x2a41e6={'name':-0x1,'initialRotation':'M[]','RotationAuto':-0x1,'x':'P[]','y':'P[]','z':'C[]','Action':[],'Regions':[],'Terrains':[],'Target':[],'Img':'laser1','ImgPoint':'laser1Point','DeadCount':0x0,'Tone':[0x0,0x0,0x0,0x0],'Opacity':0xff,'Width':0xc,'AtkWait':0x1e,'ReBound':0xa,'Max':0x78,'ScaleX':0x64,'MaxLength':0x3c0,'noPassDo':![],'UpdateJS':''};for(let _0x8d6eb0 in _0x4cea63)_0x2a41e6[_0x8d6eb0]=_0x4cea63[_0x8d6eb0];let _0x5a3699=QJ['BL']['getEvent']();_0x2a41e6['z']=QJ['BL']['dealZ'](_0x2a41e6['z'],QJ['BL']['getEvent'](),![]);if(_0x5a3699){if(typeof _0x2a41e6['x']=='string')_0x2a41e6['x']=_0x2a41e6['x']['replace'](/E\[0\]/ig,'E['+_0x5a3699['_eventId']+']');if(typeof _0x2a41e6['y']=='string')_0x2a41e6['y']=_0x2a41e6['y']['replace'](/E\[0\]/ig,'E['+_0x5a3699['_eventId']+']');if(typeof _0x2a41e6['initialRotation']=='string')_0x2a41e6['initialRotation']=_0x2a41e6['initialRotation']['replace'](/D\[0\]/ig,'D['+_0x5a3699['_eventId']+']');}_0x2a41e6['Opacity']=new QJFrame('Opacity',_0x2a41e6['Opacity'],0x0);_0x2a41e6['ScaleX']=new QJFrame('scaleX',_0x2a41e6['ScaleX'],0x0);_0x2a41e6['Width']=new QJFrame('Width',_0x2a41e6['Width'],0x0);_0x2a41e6['Max']=QJ['BL']['dealMax'](_0x2a41e6['Max'],_0x5a3699);_0x2a41e6['MaxLength']=new QJFrame('MaxLength',_0x2a41e6['MaxLength'],0x0);if(QJ['BL']['findNull'](_0x2a41e6))return null;return $gameMap['addBullet'](_0x2a41e6,0x1);};QJ['BL']['deleteLaser']=function(_0x3d0edf){for(let _0x5d71bb of $gameMap['_mapBullets']){if(!_0x5d71bb)continue;if(_0x5d71bb['bulletMode']!=0x1)continue;if(_0x5d71bb['data']['name']==_0x3d0edf){_0x5d71bb['setDead']();}}};QJ['BL']['deleteTwoPoint']=function(_0x36f43f){for(let _0x5a4d9d of $gameMap['_mapBullets']){if(!_0x5a4d9d)continue;if(_0x5a4d9d['bulletMode']!=0x2)continue;if(_0x5a4d9d['data']['name']==_0x36f43f){_0x5a4d9d['setDead']();}}};QJ['BL']['dealCharacter']=function(_0x6c3068){if(typeof _0x6c3068=='number'){if(_0x6c3068==-0x1)return $gamePlayer;else if(_0x6c3068==0x0)return QJ['BL']['getEvent']()?QJ['BL']['getEvent']():null;else return $gameMap['event'](_0x6c3068)?$gameMap['event'](_0x6c3068):null;}else return _0x6c3068;};QJ['BL']['TwoPoint']=function(_0x52853c,_0x51d4c0,_0x2fc170,_0x3d375e,_0x505117){let _0x3a3d69={'Img':'electricity[4,5]','Max':0xf0,'DeadCount':0x5,'x1':_0x52853c,'y1':_0x51d4c0,'x2':_0x2fc170,'y2':_0x3d375e,'z':0x3,'Opacity':0xff,'Tone':[0x0,0x0,0x0,0x0],'ScaleX':0x64,'Action':[],'Target':[],'Width':0x18,'AtkWait':0x1e,'ExtraRotation':0x0,'AtkRange':0x0};for(let _0x53fe6e in _0x505117)_0x3a3d69[_0x53fe6e]=_0x505117[_0x53fe6e];let _0x7e7082=QJ['BL']['getEvent']();_0x3a3d69['z']=QJ['BL']['dealZ'](_0x3a3d69['z'],QJ['BL']['getEvent'](),![]);if(_0x7e7082){if(typeof _0x3a3d69['x1']=='string')_0x3a3d69['x1']=_0x3a3d69['x1']['replace'](/E\[0\]/ig,'E['+_0x7e7082['_eventId']+']');if(typeof _0x3a3d69['y1']=='string')_0x3a3d69['y1']=_0x3a3d69['y1']['replace'](/E\[0\]/ig,'E['+_0x7e7082['_eventId']+']');if(typeof _0x3a3d69['x2']=='string')_0x3a3d69['x2']=_0x3a3d69['x2']['replace'](/E\[0\]/ig,'E['+_0x7e7082['_eventId']+']');if(typeof _0x3a3d69['y2']=='string')_0x3a3d69['y2']=_0x3a3d69['y2']['replace'](/E\[0\]/ig,'E['+_0x7e7082['_eventId']+']');}_0x3a3d69['Opacity']=new QJFrame('Opacity',_0x3a3d69['Opacity'],0x0);_0x3a3d69['ScaleX']=new QJFrame('scaleX',_0x3a3d69['ScaleX'],0x0);_0x3a3d69['Width']=new QJFrame('Width',_0x3a3d69['Width'],0x0);_0x3a3d69['Max']=QJ['BL']['dealMax'](_0x3a3d69['Max'],_0x7e7082);if(QJ['BL']['findNull'](_0x3a3d69))return null;return $gameMap['addBullet'](_0x3a3d69,0x2);};QJ['BL']['quickOrder']=function(_0x2bef66){if(!_0x1577eb[String(_0x2bef66)]){console['log']('Preset\x20'+_0x2bef66+'\x20not\x20exist');return;}_0x1577eb[_0x2bef66]['call'](this);};ImageManager['loadBullet']=function(_0xa0a136){return this['loadBitmap']('img/bullets/',_0xa0a136,0x0,![]);};ImageManager['reserveBullet']=function(_0x4b2044){return this['reserveBitmap']('img/bullets/',_0x4b2044,0x0,![],null);};const _0x39c07c=Game_Event['prototype']['initMembers'];Game_Event['prototype']['initMembers']=function(){_0x39c07c['call'](this);this['_annotationData']='';this['_groupData']=null;};const _0x102256=Game_Event['prototype']['setupPage'];Game_Event['prototype']['setupPage']=function(){_0x102256['call'](this);this['refreshBodyBox']();this['_annotationData']=QJ['BL']['calculateAnnotation'](this);this['_groupData']=QJ['BL']['calculateGroup'](this['_annotationData']);if(this['_groupData']!=''){$gameMap['_groupList'][this['_groupData']]=null;}};Game_Map['prototype']['maxScreenWidth']=function(){return this['_maxScreenWidth'];};Game_Map['prototype']['maxScreenHeight']=function(){return this['_maxScreenHeight'];};Game_Map['prototype']['regionBox']=function(_0x260b47){return this['_regionBox'][_0x260b47]||[];};Game_Map['prototype']['terrainBox']=function(_0x3bea4e){return this['_terrainBox'][_0x3bea4e]||[];};Game_Map['prototype']['noPassBox']=function(_0x75eb0b,_0x510e7b){_0x75eb0b=Math['floor'](_0x75eb0b+0.5);_0x510e7b=Math['floor'](_0x510e7b+0.5);if(_0x75eb0b<0x0||_0x75eb0b>=$gameMap['width']()||_0x510e7b<0x0||_0x510e7b>=$gameMap['height']())return!![];return this['_noPassBox'][_0x75eb0b][_0x510e7b];};Game_Map['prototype']['noPassBoxNow']=function(_0x128e52,_0x1d2c2c){_0x128e52=Math['round'](_0x128e52+0.5);_0x1d2c2c=Math['round'](_0x1d2c2c+0.5);if(_0x128e52<0x0||_0x128e52>=$gameMap['width']()||_0x1d2c2c<0x0||_0x1d2c2c>=$gameMap['height']())return!![];return this['_noPassBoxNow'][_0x128e52][_0x1d2c2c];};Game_Map['prototype']['judgeColliedWithRegion']=function(_0x41fc85,_0x313fd8){return![];};Game_Map['prototype']['judgeColliedWithTerrain']=function(_0x58d1eb,_0x8471f){return![];};Game_Map['prototype']['refreshMapBox']=function(){this['_regionBox']={};this['_terrainBox']={};this['_maxScreenWidth']=this['width']()*_0x53ad7b;this['_maxScreenHeight']=this['height']()*_0x53ad7b;let _0x47f753=this['_regionBox'];let _0x1defec=this['_terrainBox'];let _0x1b5397=0x0,_0x2f051f=0x0;for(let _0x1322f8=0x0,_0x545ff2=$dataMap['width'];_0x1322f8<_0x545ff2;_0x1322f8++){for(let _0x417af6=0x0,_0x119fc4=$dataMap['height'];_0x417af6<=_0x119fc4;_0x417af6++){if(_0x417af6==_0x119fc4){for(let _0x4f5f7b=0x1;_0x4f5f7b<0x9;_0x4f5f7b++){if(!_0x47f753[_0x4f5f7b])continue;if(_0x47f753[_0x4f5f7b][_0x47f753[_0x4f5f7b]['length']-0x1][0x0]!=0x0)continue;let _0x5d0407=_0x47f753[_0x4f5f7b][_0x47f753[_0x4f5f7b]['length']-0x1];_0x47f753[_0x4f5f7b][_0x47f753[_0x4f5f7b]['length']-0x1]=QJ['BL']['box']((_0x5d0407[0x1]+0.5)*0x30,(_0x5d0407[0x2]+_0x5d0407[0x3]/0x2)*0x30,[0x1,0x30,_0x5d0407[0x3]*0x30]);}for(let _0x133395=0x1;_0x133395<0x8;_0x133395++){if(!_0x1defec[_0x133395])continue;if(_0x1defec[_0x133395][_0x1defec[_0x133395]['length']-0x1][0x0]!=0x0)continue;let _0x5296d4=_0x1defec[_0x133395][_0x1defec[_0x133395]['length']-0x1];_0x1defec[_0x133395][_0x1defec[_0x133395]['length']-0x1]=QJ['BL']['box']((_0x5296d4[0x1]+0.5)*0x30,(_0x5296d4[0x2]+_0x5296d4[0x3]/0x2)*0x30,[0x1,0x30,_0x5296d4[0x3]*0x30]);}_0x1b5397=0x0;_0x2f051f=0x0;break;}while(!![]){let _0x3b0732=this['regionId'](_0x1322f8,_0x417af6);if(_0x3b0732==0x0){if(_0x1b5397!=0x0){let _0x1f1115=_0x47f753[_0x1b5397][_0x47f753[_0x1b5397]['length']-0x1];_0x47f753[_0x1b5397][_0x47f753[_0x1b5397]['length']-0x1]=QJ['BL']['box']((_0x1f1115[0x1]+0.5)*0x30,(_0x1f1115[0x2]+_0x1f1115[0x3]/0x2)*0x30,[0x1,0x30,_0x1f1115[0x3]*0x30]);}_0x1b5397=_0x3b0732;break;}else if(_0x1b5397!=_0x3b0732){if(_0x1b5397!=0x0){let _0x477ee5=_0x47f753[_0x1b5397][_0x47f753[_0x1b5397]['length']-0x1];_0x47f753[_0x1b5397][_0x47f753[_0x1b5397]['length']-0x1]=QJ['BL']['box']((_0x477ee5[0x1]+0.5)*0x30,(_0x477ee5[0x2]+_0x477ee5[0x3]/0x2)*0x30,[0x1,0x30,_0x477ee5[0x3]*0x30]);}_0x1b5397=_0x3b0732;if(!_0x47f753[_0x3b0732])_0x47f753[_0x3b0732]=[[0x0,_0x1322f8,_0x417af6,0x1]];else _0x47f753[_0x3b0732]['push']([0x0,_0x1322f8,_0x417af6,0x1]);break;}else{let _0xdbdd6d=_0x47f753[_0x3b0732][_0x47f753[_0x3b0732]['length']-0x1];if(_0xdbdd6d[0x1]==_0x1322f8&&_0xdbdd6d[0x2]+_0xdbdd6d[0x3]==_0x417af6)_0xdbdd6d[0x3]++;else{_0x47f753[_0x3b0732][_0x47f753[_0x3b0732]['length']-0x1]=QJ['BL']['box']((_0xdbdd6d[0x1]+0.5)*0x30,(_0xdbdd6d[0x2]+_0xdbdd6d[0x3]/0x2)*0x30,[0x1,0x30,_0xdbdd6d[0x3]*0x30]);}}break;}while(!![]){let _0x42232d=this['terrainTag'](_0x1322f8,_0x417af6);if(_0x42232d==0x0){if(_0x2f051f!=0x0){let _0x13293b=_0x1defec[_0x2f051f][_0x1defec[_0x2f051f]['length']-0x1];_0x1defec[_0x2f051f][_0x1defec[_0x2f051f]['length']-0x1]=QJ['BL']['box']((_0x13293b[0x1]+0.5)*0x30,(_0x13293b[0x2]+_0x13293b[0x3]/0x2)*0x30,[0x1,0x30,_0x13293b[0x3]*0x30]);}_0x2f051f=_0x42232d;break;}else if(_0x2f051f!=_0x42232d){if(_0x2f051f!=0x0){let _0xa393d4=_0x1defec[_0x2f051f][_0x1defec[_0x2f051f]['length']-0x1];_0x1defec[_0x2f051f][_0x1defec[_0x2f051f]['length']-0x1]=QJ['BL']['box']((_0xa393d4[0x1]+0.5)*0x30,(_0xa393d4[0x2]+_0xa393d4[0x3]/0x2)*0x30,[0x1,0x30,_0xa393d4[0x3]*0x30]);}_0x2f051f=_0x42232d;if(!_0x1defec[_0x42232d])_0x1defec[_0x42232d]=[[0x0,_0x1322f8,_0x417af6,0x1]];else _0x1defec[_0x42232d]['push']([0x0,_0x1322f8,_0x417af6,0x1]);break;}else{let _0x781c85=_0x1defec[_0x42232d][_0x1defec[_0x42232d]['length']-0x1];if(_0x781c85[0x1]==_0x1322f8&&_0x781c85[0x2]+_0x781c85[0x3]==_0x417af6)_0x781c85[0x3]++;else{_0x1defec[_0x42232d][_0x1defec[_0x42232d]['length']-0x1]=QJ['BL']['box']((_0x781c85[0x1]+0.5)*0x30,(_0x781c85[0x2]+_0x781c85[0x3]/0x2)*0x30,[0x1,0x30,_0x781c85[0x3]*0x30]);}}break;}}}this['_noPassBox']=[];this['_noPassBoxNow']=[];let _0x468645=this['_noPassBox'];let _0x442506,_0x44fdb4,_0x37359e,_0x572901;for(let _0x17ee2d=0x0,_0x462404=$dataMap['width'];_0x17ee2d<_0x462404;_0x17ee2d++){_0x468645[_0x17ee2d]=[];for(let _0x4128ff=0x0,_0xc5bc5e=$dataMap['height'];_0x4128ff<_0xc5bc5e;_0x4128ff++){_0x442506=this['isPassable'](_0x17ee2d,_0x4128ff,0x2);_0x44fdb4=this['isPassable'](_0x17ee2d,_0x4128ff,0x4);_0x37359e=this['isPassable'](_0x17ee2d,_0x4128ff,0x6);_0x572901=this['isPassable'](_0x17ee2d,_0x4128ff,0x8);_0x468645[_0x17ee2d]['push'](_0x442506&&_0x44fdb4&&_0x37359e&&_0x572901);}}};const _0x2cc519=Game_Map['prototype']['setup'];Game_Map['prototype']['setup']=function(_0x273ecb){this['_mapBullets']=[];this['_forceInterpreterQB']=new Array();this['_groupList']={};_0x2cc519['call'](this,_0x273ecb);this['refreshMapBox']();this['refreshUpdateBoxData']();};Game_Map['prototype']['refreshUpdateBoxData']=function(){this['_noPassBoxNow']=JsonEx['makeDeepCopy'](this['_noPassBox']);for(let _0x3893fe of $gameMap['events']()){if(_0x3893fe['laserObstacle'])this['_noPassBoxNow'][Math['floor'](_0x3893fe['x']+0.5)][Math['floor'](_0x3893fe['y']+0.5)]=![];}for(let _0x350a88 in this['_groupList']){this['_groupList'][_0x350a88]=QJ['BL']['getGroupIdMap'](_0x350a88);}};const _0x55b8f0=Game_Map['prototype']['update'];Game_Map['prototype']['update']=function(_0x22afa0){_0x55b8f0['call'](this,_0x22afa0);this['refreshUpdateBoxData']();for(let _0x11d0dd=0x0,_0x55777b=this['_forceInterpreterQB']['length'];_0x11d0dd<_0x55777b;_0x11d0dd++){if(!this['_forceInterpreterQB'][_0x11d0dd])continue;if(!this['_forceInterpreterQB'][_0x11d0dd]['isRunning']()){this['_forceInterpreterQB'][_0x11d0dd]['setup']($dataCommonEvents[this['_forceInterpreterQB'][_0x11d0dd]['commonEventId']]['list'],this['_forceInterpreterQB'][_0x11d0dd]['EID']>0x0?this['_forceInterpreterQB'][_0x11d0dd]['EID']:0x0);}this['_forceInterpreterQB'][_0x11d0dd]['update']();}$gameMap['_aliveBullet']=0x0;this['_mapBullets']['forEach'](function(_0x1cdf5a){if(_0x1cdf5a){$gameMap['_aliveBullet']++;_0x1cdf5a['update']();}});};Game_Map['prototype']['bulletsNumber']=function(){return $gameMap['_aliveBullet'];};Game_Map['prototype']['addBullet']=function(_0x554657,_0x579479){if(_0x408440){if($gameMap['_aliveBullet']>=_0x24471b){console['warn']('The\x20number\x20of\x20bullets\x20has\x20reached\x20the\x20limit.'+'And\x20the\x20number\x20is'+$gameMap['_aliveBullet']+'.');return null;}}let _0x121995;if(!_0x579479)_0x121995=new Game_QJBullet(_0x554657,this['_mapBullets']['length']);else if(_0x579479==0x1)_0x121995=new Game_QJLaser(_0x554657,this['_mapBullets']['length']);else if(_0x579479==0x2)_0x121995=new Game_QJTwoPoint(_0x554657,this['_mapBullets']['length']);this['_mapBullets']['push'](_0x121995);if(!this['_mapBullets'][this['_mapBullets']['length']-0x1]['dead'])SceneManager['_scene']['_spriteset']['createBullet'](this['_mapBullets']['length']-0x1,_0x579479);return _0x121995;};Game_Map['prototype']['removeBullet']=function(_0x36de11){let _0x38b49f=this['_mapBullets'][_0x36de11];if(_0x38b49f){let _0x2ba2c5=this['findBulletSprite'](_0x38b49f);if(_0x2ba2c5){if(_0x2ba2c5['parent'])_0x2ba2c5['parent']['removeChild'](_0x2ba2c5);_0x2ba2c5['destroy']();}_0x38b49f['destroy']();this['_mapBullets'][_0x36de11]=null;}};Game_Map['prototype']['bullet']=function(_0x554288){return this['_mapBullets'][_0x554288];};Game_Map['prototype']['findBulletSprite']=function(_0x5580b8){if(!SceneManager['_scene']['_spriteset'])return null;let _0x5b78ef,_0x764b91=null;if(_0x5580b8['data']['z']=='T'){_0x5b78ef=SceneManager['_scene']['_spriteset']['_parallaxBulletContainer'];}else if(_0x5580b8['data']['z']=='M'){_0x5b78ef=SceneManager['_scene']['_spriteset']['_mapBulletContainer'];}else if(_0x5580b8['data']['z']=='P'){_0x5b78ef=SceneManager['_scene']['_spriteset']['_upperBulletContainer'];}else{_0x5b78ef=SceneManager['_scene']['_spriteset']['_lowerBulletContainer'];}for(let _0x5743f7 of _0x5b78ef['children']){if(_0x5743f7['o']==_0x5580b8){_0x764b91=_0x5743f7;break;}}return _0x764b91;};QJ['BL']['callCE']=function(_0x3d31ff,_0x6ffc64){QJ['BL']['callCommonEvent'](_0x3d31ff,0x0,[],{'x':_0x6ffc64['screenShowX'](),'y':_0x6ffc64['screenShowY']()});};QJ['BL']['SetMove']=function(_0x3c713d){_0x2c0d3c=!!!_0x3c713d;};QJ['BL']['ClearAll']=function(){if(!SceneManager['_scene'])return;if(!SceneManager['_scene']['_spriteset'])return;SceneManager['_scene']['_spriteset']['clearAllButtle']();$gameMap['_mapBullets']=[];};const _0x2bf094=Scene_Boot['loadSystemImages'];Scene_Boot['loadSystemImages']=function(){_0x2bf094['call'](this);for(let _0x4226e5 of _0xc93978){if(_0x4226e5['includes']('|')){let _0x51cca7=_0x4226e5['split']('|');for(let _0xf7af4d of _0x51cca7){ImageManager['reserveBullet'](_0xf7af4d);}}else ImageManager['reserveBullet'](_0x4226e5);}};Bitmap['prototype']['drawTextChangeRotation']=function(_0x371089,_0x438968,_0x15a824,_0x579f89,_0x327cb3,_0x2eaf70,_0x5621f8){if(_0x371089!==undefined){var _0x4dbbbc=_0x438968;var _0x2d3b0e=_0x15a824+_0x327cb3-(_0x327cb3-this['fontSize']*0.7)/0x2;var _0x5bc96a=this['_context'];var _0x14ff46=_0x5bc96a['globalAlpha'];_0x579f89=_0x579f89||0xffffffff;if(_0x2eaf70==='center'){_0x4dbbbc+=_0x579f89/0x2;}if(_0x2eaf70==='right'){_0x4dbbbc+=_0x579f89;}_0x5bc96a['save']();_0x5bc96a['translate'](0x0,0x0);_0x5bc96a['rotate'](_0x5621f8);_0x5bc96a['translate'](0x0,-_0x327cb3+0x4);_0x5bc96a['font']=this['_makeFontNameText']();_0x5bc96a['textAlign']=_0x2eaf70;_0x5bc96a['textBaseline']='alphabetic';_0x5bc96a['globalAlpha']=0x1;this['_drawTextOutline'](_0x371089,_0x4dbbbc,_0x2d3b0e,_0x579f89);_0x5bc96a['globalAlpha']=_0x14ff46;this['_drawTextBody'](_0x371089,_0x4dbbbc,_0x2d3b0e,_0x579f89);_0x5bc96a['restore']();this['_setDirty']();}};Bitmap['prototype']['drawTextVerticalRow']=function(_0x484cce,_0x3778ab,_0x16e3c1,_0x355d8a,_0x32561d,_0x8fc050){if(_0x484cce!==undefined){var _0x46b6ec=_0x3778ab+_0x32561d/0x2;var _0x59cd83=_0x16e3c1+_0x32561d;var _0x2c00da=this['_context'];var _0x3e4574=_0x2c00da['globalAlpha'];_0x355d8a=_0x355d8a||0xffffffff;_0x2c00da['save']();_0x2c00da['font']=this['_makeFontNameText']();_0x2c00da['textAlign']=_0x8fc050;_0x2c00da['textBaseline']='alphabetic';for(let _0x4e714e=0x0;_0x4e714e<_0x484cce['length'];_0x4e714e++){_0x2c00da['globalAlpha']=0x1;this['_drawTextOutline'](_0x484cce[_0x4e714e],_0x46b6ec,_0x59cd83+_0x4e714e*_0x32561d,_0x355d8a);_0x2c00da['globalAlpha']=_0x3e4574;this['_drawTextBody'](_0x484cce[_0x4e714e],_0x46b6ec,_0x59cd83+_0x4e714e*_0x32561d,_0x355d8a);}_0x2c00da['restore']();this['_setDirty']();}};Game_InterpreterForceQBEvent['prototype']=Object['create'](Game_Interpreter['prototype']);Game_InterpreterForceQBEvent['prototype']['constructor']=Game_InterpreterForceQBEvent;Game_InterpreterForceQBEvent['prototype']['initialize']=function(_0x567f66){Game_Interpreter['prototype']['initialize']['call'](this,0x0);this['pageIndex']=_0x567f66;};Game_InterpreterForceQBEvent['prototype']['terminate']=function(){$gameMap['event'](this['eventId']())['_forceInterpreterQB']['splice']($gameMap['event'](this['eventId']())['_forceInterpreterQB']['indexOf'](this),0x1);Game_Interpreter['prototype']['terminate']['call'](this);};Game_InterpreterForceQBCommonEvent['prototype']=Object['create'](Game_Interpreter['prototype']);Game_InterpreterForceQBCommonEvent['prototype']['constructor']=Game_InterpreterForceQBCommonEvent;Game_InterpreterForceQBCommonEvent['prototype']['initialize']=function(_0x575529,_0x26b477,_0x326792,_0x3b4f82){Game_Interpreter['prototype']['initialize']['call'](this,0x0);this['commonEventId']=_0x575529;this['EID']=_0x26b477;this['BP']=_0x326792;this['bullet']=_0x3b4f82;};Game_InterpreterForceQBCommonEvent['prototype']['terminate']=function(){$gameMap['_forceInterpreterQB']['splice']($gameMap['_forceInterpreterQB']['indexOf'](this),0x1);Game_Interpreter['prototype']['terminate']['call'](this);};QJ['BL']['randomColor']=function(_0x3b2b7b,_0x12852e){return QJ['BL']['rgbToHex']({'r':_0x3b2b7b+Math['floor'](Math['random']()*_0x12852e),'g':_0x3b2b7b+Math['floor'](Math['random']()*_0x12852e),'b':_0x3b2b7b+Math['floor'](Math['random']()*_0x12852e)});};QJ['BL']['ColorGrad']=function(_0x2bcb4b,_0x3bb791,_0x1a57f4,_0x11e5ef,_0xf06c48,_0x21af30,_0x588376){if(!_0x3bb791['includes']('|'))return _0x3bb791;const _0x412766=_0x3bb791['split']('~');const _0x1b2c12=_0x412766['length'];const _0x2a1fcd=_0x2bcb4b['_context']['createLinearGradient'](_0x1a57f4,_0x11e5ef,_0x1a57f4+_0xf06c48*Math['sin'](_0x588376),_0x11e5ef-_0x21af30*Math['cos'](_0x588376));for(let _0x3ffb11=0x0;_0x3ffb11<_0x1b2c12;_0x3ffb11++){let _0x7b52e8=_0x412766[_0x3ffb11]['split']('|');_0x2a1fcd['addColorStop'](_0x7b52e8[0x0],_0x7b52e8[0x1]);}return _0x2a1fcd;};QJ['BL']['hexToRgb']=function(_0x51abf2){let _0x4abfdb=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i['exec'](_0x51abf2);return{'r':parseInt(_0x4abfdb[0x1],0x10),'g':parseInt(_0x4abfdb[0x2],0x10),'b':parseInt(_0x4abfdb[0x3],0x10)};};QJ['BL']['rgbToHex']=function(_0x4e16b8){let _0x5020d5=_0x4e16b8['r']['toString'](0x10),_0x1bc7cd=_0x4e16b8['g']['toString'](0x10),_0x9579b5=_0x4e16b8['b']['toString'](0x10);return'#'+(_0x5020d5['length']==0x1?'0'+_0x5020d5:_0x5020d5)+(_0x1bc7cd['length']==0x1?'0'+_0x1bc7cd:_0x1bc7cd)+(_0x9579b5['length']==0x1?'0'+_0x9579b5:_0x9579b5);};QJ['BL']['calculateAngleByTwoPoint']=function(_0x4524ca,_0x13bb63,_0x3cc01f,_0x18d9b5){let _0x276302;if(_0x3cc01f>_0x4524ca&&_0x18d9b5<_0x13bb63)_0x276302=-Math['atan']((_0x4524ca-_0x3cc01f)/(_0x13bb63-_0x18d9b5));if(_0x3cc01f>_0x4524ca&&_0x18d9b5>_0x13bb63)_0x276302=Math['PI']-Math['atan']((_0x4524ca-_0x3cc01f)/(_0x13bb63-_0x18d9b5));if(_0x3cc01f<_0x4524ca&&_0x18d9b5>_0x13bb63)_0x276302=Math['PI']-Math['atan']((_0x4524ca-_0x3cc01f)/(_0x13bb63-_0x18d9b5));if(_0x3cc01f<_0x4524ca&&_0x18d9b5<_0x13bb63)_0x276302=0x2*Math['PI']-Math['atan']((_0x4524ca-_0x3cc01f)/(_0x13bb63-_0x18d9b5));if(_0x3cc01f==_0x4524ca&&_0x18d9b5>_0x13bb63)_0x276302=Math['PI'];if(_0x3cc01f==_0x4524ca&&_0x18d9b5<_0x13bb63)_0x276302=0x0;if(_0x3cc01f>_0x4524ca&&_0x18d9b5==_0x13bb63)_0x276302=Math['PI']/0x2;if(_0x3cc01f<_0x4524ca&&_0x18d9b5==_0x13bb63)_0x276302=Math['PI']*0x3/0x2;if(_0x3cc01f==_0x4524ca&&_0x18d9b5==_0x13bb63)_0x276302=null;return _0x276302;};QJ['BL']['calculateAngleByDirection']=function(_0x4ce397){if(_0x4ce397==0x1)return Math['PI']*0x5/0x4;if(_0x4ce397==0x2)return Math['PI'];if(_0x4ce397==0x3)return Math['PI']*0x3/0x4;if(_0x4ce397==0x4)return Math['PI']*0x3/0x2;if(_0x4ce397==0x6)return Math['PI']/0x2;if(_0x4ce397==0x7)return Math['PI']*0x7/0x4;if(_0x4ce397==0x8)return 0x0;if(_0x4ce397==0x9)return Math['PI']/0x4;return 0x0;};QJ['BL']['calculateAnnotation']=function(_0x2dad61){let _0x2231f2=null,_0x5073eb='';try{_0x2231f2=_0x2dad61['page']();}catch(_0x2a617c){_0x2231f2=null;}if(_0x2231f2){if(_0x2231f2['list'][0x0]['code']===0x6c){let _0x4c5f7b=0x0;while(_0x2231f2['list'][_0x4c5f7b]['code']===0x198||_0x2231f2['list'][_0x4c5f7b]['code']===0x6c){_0x5073eb=_0x5073eb+_0x2231f2['list'][_0x4c5f7b]['parameters'][0x0];_0x4c5f7b++;}}}return _0x5073eb;};QJ['BL']['calculateGroup']=function(_0x58d072){let _0x22bfba=_0x58d072['match'](/<Group:[^>]*>/i);return _0x22bfba?_0x22bfba[0x0]['substr'](0x8,_0x22bfba[0x0]['length']-0xa):'';};QJ['BL']['getGroup']=function(_0x33a1e5){return $gameMap['events']()['filter'](_0x5c8b2c=>{return _0x5c8b2c&&_0x5c8b2c['_groupData']==_0x33a1e5;});};QJ['BL']['getGroupId']=function(_0xf2df0d){return $gameMap['_groupList'][_0xf2df0d];};QJ['BL']['getGroupIdInRange']=function(_0x4f1e20,_0x452736,_0x10a20f,_0x497502){let _0x58af67,_0x30a5d4,_0x3c33a2;_0x497502=_0x497502*_0x497502;_0x452736+=$gameMap['displayX']()*0x30;_0x10a20f+=$gameMap['displayY']()*0x30;return $gameMap['_groupList'][_0x4f1e20]['filter'](_0x4af46c=>{if(!_0x4af46c)return![];_0x58af67=$gameMap['event'](_0x4af46c);if(!_0x58af67)return![];_0x30a5d4=_0x58af67['boxScreenX']()-_0x452736;_0x3c33a2=_0x58af67['boxScreenY']()-_0x10a20f;return _0x30a5d4*_0x30a5d4+_0x3c33a2*_0x3c33a2<=_0x497502;});};QJ['BL']['getGroupIdMap']=function(_0xf58781){return $gameMap['events']()['filter'](_0x40e128=>{return _0x40e128&&_0x40e128['_groupData']==_0xf58781;})['map'](_0x4d05de=>{return _0x4d05de['_eventId'];});};QJ['BL']['getMinEventId']=function(_0x405bed,_0x274807,_0x1da650,_0x51ceed,_0x279ff3){let _0x11c309=null,_0x2a67f1=0x98967f,_0x2e3da5=0x0;_0x51ceed=_0x51ceed||0x1;_0x279ff3=_0x279ff3||null;if(_0x1da650){_0x11c309=QJ['BL']['getGroup'](_0x1da650);}else{_0x11c309=$gameMap['events']();}let _0x254385,_0x5448d0,_0x3ba846,_0xe11a74,_0x4774f9;if(_0x279ff3&&_0x279ff3>0x0){_0x279ff3=_0x279ff3*_0x279ff3;_0x11c309=_0x11c309['filter'](_0x30048a=>{_0x254385=_0x30048a['boxScreenX']()-_0x405bed;_0x5448d0=_0x30048a['boxScreenY']()-_0x274807;return _0x254385*_0x254385+_0x5448d0*_0x5448d0<=_0x279ff3;});}_0x11c309=_0x11c309['sort']((_0x4d07b5,_0x43779b)=>{_0x254385=_0x4d07b5['boxScreenX']();_0x5448d0=_0x4d07b5['boxScreenY']();_0x3ba846=_0x43779b['boxScreenX']();_0xe11a74=_0x43779b['boxScreenY']();_0x4774f9=(_0x254385-_0x405bed)*(_0x254385-_0x405bed)+(_0x5448d0-_0x274807)*(_0x5448d0-_0x274807)-((_0x3ba846-_0x405bed)*(_0x3ba846-_0x405bed)+(_0xe11a74-_0x274807)*(_0xe11a74-_0x274807));return _0x4774f9>0x0?0x1:_0x4774f9<0x0?-0x1:0x0;});_0x2e3da5=_0x11c309[Math['min'](_0x51ceed,_0x11c309['length'])-0x1];return _0x2e3da5?_0x2e3da5['_eventId']:0x0;};QJ['BL']['getCommentId']=function(_0x455396){let _0x10e0c9=$gameMap['events'](),_0x5c546e=new Array();for(let _0x3171d6 in _0x10e0c9){if(_0x10e0c9[_0x3171d6]['event']()['note']['includes'](_0x455396)){if(_0x10e0c9[_0x3171d6]['_pageIndex']>=0x0){_0x5c546e['push'](_0x10e0c9[_0x3171d6]['_eventId']);}}}return _0x5c546e;};QJ['BL']['getComment']=function(_0x471221){let _0x569f4b=$gameMap['events'](),_0x1265e1=new Array();for(let _0x58375c in _0x569f4b){if(_0x569f4b[_0x58375c]['event']()['note']['includes'](_0x471221)){if(_0x569f4b[_0x58375c]['_pageIndex']>=0x0){_0x1265e1['push'](_0x569f4b[_0x58375c]);}}}return _0x1265e1;};QJ['BL']['getMinEventIdNobi']=function(_0x135462,_0x34b410,_0x602243){let _0xc925a3=null,_0x150964=0x98967f,_0x458cbd=0x0;if(_0x602243){_0xc925a3=QJ['BL']['getComment'](_0x602243);}else{_0xc925a3=$gameMap['events']();}for(let _0x4a6aa6 in _0xc925a3){let _0x32ea11=(_0xc925a3[_0x4a6aa6]['boxScreenX']()-_0x135462)*(_0xc925a3[_0x4a6aa6]['boxScreenX']()-_0x135462)+(_0xc925a3[_0x4a6aa6]['boxScreenY']()-_0x34b410)*(_0xc925a3[_0x4a6aa6]['boxScreenY']()-_0x34b410);if(_0x32ea11<_0x150964){_0x458cbd=_0xc925a3[_0x4a6aa6]['_eventId'];_0x150964=_0x32ea11;}}return _0x458cbd;};QJ['BL']['error']=function(_0x10b5ac){if(!_0x408440)return;throw new Error('A\x20writing\x20error\x20in\x20bullet\x20data\x20'+_0x10b5ac+'\x20.');};QJ['BL']['findNull']=function(_0x1ff780){for(var _0x2979ad in _0x1ff780){if(_0x1ff780[_0x2979ad]==null){if(!_0x408440)return!![];console['error']('There\x20is\x20an\x20error\x20in\x20parameter\x20entry.\x20A\x20bullet\x20was\x20not\x20created\x20successfully.\x20Error:'+_0x2979ad);return!![];}}return![];};QJ['BL']['getAnnotation']=function(_0x214450){let _0x468820=null,_0x4c2bf7='';try{_0x468820=_0x214450['page']();}catch(_0x2abdc6){_0x468820=null;}if(_0x468820){if(_0x468820['list'][0x0]['code']===0x6c){let _0x43eada=0x0;while(_0x468820['list'][_0x43eada]['code']===0x198||_0x468820['list'][_0x43eada]['code']===0x6c){_0x4c2bf7=_0x4c2bf7+_0x468820['list'][_0x43eada]['parameters'][0x0];_0x43eada++;}}}return _0x4c2bf7;};QJ['BL']['dealCollisionBox']=function(_0x6e1205){let _0x56275b=new Array();if(_0x6e1205[0x0]=='C'){let _0x4bdf0f=eval(_0x6e1205['match'](/\[[^\]]*\]/i)[0x0]);if(!_0x4bdf0f||isNaN(Number(_0x4bdf0f[0x0])))return null;return[0x0,Number(_0x4bdf0f[0x0])];}else if(_0x6e1205[0x0]=='R'){let _0x27b08a=eval(_0x6e1205['match'](/\[[^\]]*\]/i)[0x0]);if(!_0x27b08a||isNaN(Number(_0x27b08a[0x0]))||isNaN(Number(_0x27b08a[0x1])))return null;return[0x1,Number(_0x27b08a[0x0]),Number(_0x27b08a[0x1])];}return null;};const _0x1f013f=Game_Temp['prototype']['setDestination'];Game_Temp['prototype']['setDestination']=function(_0x2656ce,_0x32bc6e){if(_0x2c0d3c)return;_0x1f013f['call'](this,_0x2656ce,_0x32bc6e);};const _0x225c69=Game_Interpreter['prototype']['executeCommand'];Game_Interpreter['prototype']['executeCommand']=function(){_0x15f65b=this;return _0x225c69['call'](this);};QJ['BL']['getEvent']=()=>{return typeof _0x15f65b=='number'?$gameMap['event'](_0x15f65b):$gameMap['event'](_0x15f65b['_eventId']);};QJFrame['prototype']['initialize']=function(_0x22dcff,_0x5e933d,_0x20e0cc,_0x2c1c75){_0x2c1c75=_0x2c1c75||![];this['i']=_0x20e0cc;this['n']=_0x22dcff;this['d']={};this['m']=0x0;this['t']=0x0;this['rt']=0x0;this['isMode']=!![];if(typeof _0x5e933d=='string'&&_0x5e933d['includes']('~')){let _0x1dd2bd=_0x5e933d['split']('~'),_0x4ae3f0=0x0,_0x4ba581=0x0,_0x58974e;for(let _0x242b15=0x0,_0x372f2b=_0x1dd2bd['length'],_0xfcba55;_0x242b15<_0x372f2b;_0x242b15++){if(_0x1dd2bd[_0x242b15]['includes']('|')){_0xfcba55=_0x1dd2bd[_0x242b15]['split']('|');if(_0x20e0cc==0x0)_0x4ae3f0=Number(_0xfcba55[0x1]);else if(_0x20e0cc==0x1)_0x4ae3f0=_0xfcba55[0x1];else if(_0x20e0cc==0x2)_0x4ae3f0=Number(_0xfcba55[0x1])*Math['PI']/0xb4;this['d'][this['m']]=_0x4ae3f0;if(_0x2c1c75){for(let _0x5d98d8=this['m'],_0x48a500=Number(_0xfcba55[0x0]);_0x5d98d8<_0x48a500;_0x5d98d8++){this['d'][_0x5d98d8]=_0x4ae3f0;}}this['m']+=Number(_0xfcba55[0x0]);this['d'][this['m']]=_0x4ae3f0;}else if(_0x1dd2bd[_0x242b15]['includes']('/')){_0xfcba55=_0x1dd2bd[_0x242b15]['split']('/');_0x4ba581=Number(_0xfcba55[0x0]);if(_0x20e0cc==0x0){_0x4ae3f0=Number(_0xfcba55[0x1]);_0x58974e=this['d'][this['m']];for(let _0x58d5a1=0x1;_0x58d5a1<=_0x4ba581;_0x58d5a1++){this['d'][this['m']+_0x58d5a1]=_0x58974e+(_0x4ae3f0-_0x58974e)*_0x58d5a1/_0x4ba581;}this['m']+=_0x4ba581;this['d'][this['m']]=_0x4ae3f0;}else if(_0x20e0cc==0x1){_0x4ae3f0=QJ['BL']['hexToRgb'](_0xfcba55[0x1]);_0x58974e=QJ['BL']['hexToRgb'](this['d'][this['m']]);for(let _0x46c827=0x1;_0x46c827<=_0x4ba581;_0x46c827++){this['d'][this['m']+_0x46c827]=QJ['BL']['rgbToHex']({'r':Math['floor'](_0x58974e['r']+(_0x4ae3f0['r']-_0x58974e['r'])*_0x46c827/_0x4ba581),'g':Math['floor'](_0x58974e['g']+(_0x4ae3f0['g']-_0x58974e['g'])*_0x46c827/_0x4ba581),'b':Math['floor'](_0x58974e['b']+(_0x4ae3f0['b']-_0x58974e['b'])*_0x46c827/_0x4ba581)});}this['m']+=_0x4ba581;this['d'][this['m']]=_0xfcba55[0x1];}else if(_0x20e0cc==0x2){_0x4ae3f0=Number(_0xfcba55[0x1])*Math['PI']/0xb4;_0x58974e=this['d'][this['m']];for(let _0x2dd70e=0x1;_0x2dd70e<=_0x4ba581;_0x2dd70e++){this['d'][this['m']+_0x2dd70e]=_0x58974e+(_0x4ae3f0-_0x58974e)*_0x2dd70e/_0x4ba581;}this['m']+=_0x4ba581;this['d'][this['m']]=_0x4ae3f0;}}else if(_0x1dd2bd[_0x242b15]['includes']('%')){_0xfcba55=_0x1dd2bd[_0x242b15]['split']('%');_0x4ba581=Number(_0xfcba55[0x0]);if(_0x20e0cc==0x0){_0x4ae3f0=Number(_0xfcba55[0x1]);_0x58974e=this['d'][this['m']];for(let _0x2c480a=0x1;_0x2c480a<=_0x4ba581;_0x2c480a++){this['d'][this['m']+_0x2c480a]=_0x4ae3f0-(_0x4ae3f0-_0x58974e)*Math['sqrt'](0x1-Math['pow'](_0x2c480a/_0x4ba581,0x2));}this['m']+=_0x4ba581;this['d'][this['m']]=_0x4ae3f0;}else if(_0x20e0cc==0x1){_0x4ae3f0=QJ['BL']['hexToRgb'](_0xfcba55[0x1]);_0x58974e=QJ['BL']['hexToRgb'](this['d'][this['m']]);for(let _0x65a199=0x1,_0x24aa70;_0x65a199<=_0x4ba581;_0x65a199++){_0x24aa70=Math['sqrt'](0x1-Math['pow'](_0x65a199/_0x4ba581,0x2));this['d'][this['m']+_0x65a199]=QJ['BL']['rgbToHex']({'r':Math['floor'](_0x4ae3f0['r']-(_0x4ae3f0['r']-_0x58974e['r'])*_0x24aa70),'g':Math['floor'](_0x4ae3f0['g']-(_0x4ae3f0['g']-_0x58974e['g'])*_0x24aa70),'b':Math['floor'](_0x4ae3f0['b']-(_0x4ae3f0['b']-_0x58974e['b'])*_0x24aa70)});}this['m']+=_0x4ba581;this['d'][this['m']]=_0xfcba55[0x1];}else if(_0x20e0cc==0x2){_0x4ae3f0=Number(_0xfcba55[0x1])*Math['PI']/0xb4;_0x58974e=this['d'][this['m']];for(let _0x35d689=0x1;_0x35d689<=_0x4ba581;_0x35d689++){this['d'][this['m']+_0x35d689]=_0x4ae3f0-(_0x4ae3f0-_0x58974e)*Math['sqrt'](0x1-Math['pow'](_0x35d689/_0x4ba581,0x2));}this['m']+=_0x4ba581;this['d'][this['m']]=_0x4ae3f0;}}}}else{this['isMode']=![];let _0x321332;if(_0x20e0cc==0x0)_0x321332=Number(_0x5e933d);else if(_0x20e0cc==0x1)_0x321332=_0x5e933d;else if(_0x20e0cc==0x2)_0x321332=Number(_0x5e933d)*Math['PI']/0xb4;this['d'][this['m']]=_0x321332;}};QJFrame['prototype']['get']=function(){if(this['t']>this['m'])this['t']=0x0;if(this['d'][this['t']]!=undefined)this['rt']=this['t'];this['t']++;return this['d'][this['rt']];};QJFrame['prototype']['getOnly']=function(){return this['d'][this['rt']];};QJFrame['prototype']['getTar']=function(_0x5a81c8){return this['d'][_0x5a81c8>this['m']?0x0:_0x5a81c8];};Spriteset_Map['prototype']['clearAllButtle']=function(){this['_upperBulletContainer']['removeChildren']();this['_lowerBulletContainer']['removeChildren']();this['_parallaxBulletContainer']['removeChildren']();this['_mapBulletContainer']['removeChildren']();};const _0x5f4317=Spriteset_Map['prototype']['createParallax'];Spriteset_Map['prototype']['createParallax']=function(){_0x5f4317['call'](this);this['_parallaxBulletContainer']=new _0x1f7c29();this['_parallaxBulletContainerParticle']=new _0x1f7c29(!![]);this['_baseSprite']['addChild'](this['_parallaxBulletContainerParticle']);this['_baseSprite']['addChild'](this['_parallaxBulletContainer']);};const _0x326597=Spriteset_Map['prototype']['createCharacters'];Spriteset_Map['prototype']['createCharacters']=function(){this['_mapBulletContainer']=new _0x1f7c29();this['_mapBulletContainerParticle']=new _0x1f7c29(!![]);this['_mapBulletContainer']['z']=0.5;this['_mapBulletContainerParticle']['z']=0.5;this['_tilemap']['addChild'](this['_mapBulletContainerParticle']);this['_tilemap']['addChild'](this['_mapBulletContainer']);_0x326597['call'](this);this['_upperBulletContainer']=new _0x1f7c29();this['_upperBulletContainerParticle']=new _0x1f7c29(!![]);this['_lowerBulletContainer']=new _0x1f7c29();this['_lowerBulletContainerParticle']=new _0x1f7c29(!![]);this['addChild'](this['_lowerBulletContainerParticle']);this['addChild'](this['_lowerBulletContainer']);if(!$gameMap['_mapBullets'])return;if($gameMap['_mapBullets']['length']==0x0)return;for(let _0x8acf22=0x0;_0x8acf22<$gameMap['_mapBullets']['length'];_0x8acf22++){if($gameMap['_mapBullets'][_0x8acf22])this['createBullet'](_0x8acf22,$gameMap['_mapBullets'][_0x8acf22]['bulletMode']);}};const _0x3e2903=Spriteset_Base['prototype']['createTimer'];Spriteset_Base['prototype']['createTimer']=function(){_0x3e2903['call'](this);this['addChild'](this['_upperBulletContainerParticle']);this['addChild'](this['_upperBulletContainer']);};Spriteset_Map['prototype']['createBullet']=function(_0x93f10e,_0xb243d6){let _0x1457b1=$gameMap['_mapBullets'][_0x93f10e],_0x1bdbbc;if(!_0xb243d6)_0x1bdbbc=new _0x38a154(_0x93f10e);else if(_0xb243d6==0x1)_0x1bdbbc=new _0x693033(_0x93f10e);else if(_0xb243d6==0x2)_0x1bdbbc=new _0x3d5f58(_0x93f10e);if(_0x1457b1['data']['z']=='T'){this['_parallaxBulletContainer']['addChild'](_0x1bdbbc);_0x1bdbbc['particleParent']=this['_parallaxBulletContainerParticle'];}else if(_0x1457b1['data']['z']=='M'){this['_mapBulletContainer']['addChild'](_0x1bdbbc);_0x1bdbbc['particleParent']=this['_mapBulletContainerParticle'];}else if(_0x1457b1['data']['z']=='P'){this['_upperBulletContainer']['addChild'](_0x1bdbbc);_0x1bdbbc['particleParent']=this['_upperBulletContainerParticle'];}else{this['_lowerBulletContainer']['addChild'](_0x1bdbbc);_0x1bdbbc['particleParent']=this['_lowerBulletContainerParticle'];}};function _0x1f7c29(){this['initialize']['apply'](this,arguments);};_0x1f7c29['prototype']=Object['create'](PIXI['Container']['prototype']);_0x1f7c29['prototype']['constructor']=_0x1f7c29;_0x1f7c29['prototype']['initialize']=function(){PIXI['Container']['call'](this);this['list']={};};_0x1f7c29['prototype']['addChildrenAtId']=function(_0x3c2972){let _0x18930d=_0x3c2972['QJParentid'];if(this['list'][_0x18930d]){this['list'][_0x18930d]['addChild'](_0x3c2972);}else{let _0x3a5aa4=new _0x13b622(_0x18930d);this['addChild'](_0x3a5aa4);_0x3a5aa4['addChild'](_0x3c2972);this['list'][_0x18930d]=_0x3a5aa4;}};_0x1f7c29['prototype']['update']=function(){this['children']['forEach'](function(_0x397ad3){if(_0x397ad3['update']){_0x397ad3['update']();}});if(this['AIBitmap'])this['AIBitmap']['clear']();this['children']['forEach'](function(_0x17acd2){if(_0x17acd2['updateafterImage']){_0x17acd2['updateafterImage']();}});};_0x1f7c29['prototype']['drawAfterImage']=function(_0x5de016,_0x208107,_0x2f9d13,_0x3d0c39,_0x5b9be2,_0x943f17,_0x81afa5){if(!this['AIBitmap']){this['AIBitmap']=new Bitmap(Graphics['width']+0x30*0x2,Graphics['height']);let _0x66dc3f=new Sprite(this['AIBitmap']);_0x66dc3f['x']=-0x30;this['addChild'](_0x66dc3f);}let _0xc0e342=this['AIBitmap']['_context'];_0xc0e342['save']();_0xc0e342['translate'](_0x5de016,_0x208107);_0xc0e342['rotate'](_0x2f9d13);_0xc0e342['fillStyle']=_0x3d0c39;_0xc0e342['globalAlpha']=_0x5b9be2;_0xc0e342['fillRect'](-_0x943f17/0x2,0x0,_0x943f17,_0x81afa5);_0xc0e342['restore']();this['AIBitmap']['_setDirty']();};function _0x13b622(){this['initialize']['apply'](this,arguments);};_0x13b622['prototype']=Object['create'](PIXI['particles']['ParticleContainer']['prototype']);_0x13b622['prototype']['constructor']=_0x13b622;_0x13b622['prototype']['initialize']=function(_0x56fb54){PIXI['particles']['ParticleContainer']['call'](this,0x2710,{'rotation':!![],'scale':!![],'alpha':!![],'uvs':!![]});this['QJParentid']=_0x56fb54;};_0x13b622['prototype']['update']=function(){this['children']['forEach'](function(_0x260feb){if(_0x260feb['update']){_0x260feb['update']();}});};const _0x30f982=Game_Variables['prototype']['initialize'];Game_Variables['prototype']['initialize']=function(){_0x30f982['call'](this);QJ['BL']['initParam'](this);};QJ['BL']['initParam']=function(_0x4d1d31){if(!_0x4d1d31['_playerInitBox']){_0x4d1d31['_playerInitBox']=String(_0x325437['playerInitBox'])||'C[24]';}if(!_0x4d1d31['_playerInitBoxOffsetX']){_0x4d1d31['_playerInitBoxOffsetX']=Number(_0x325437['playerInitBoxOffsetX'])||0x0;}if(!_0x4d1d31['_playerInitBoxOffsetY']){_0x4d1d31['_playerInitBoxOffsetY']=Number(_0x325437['playerInitBoxOffsetY'])||0x0;}if(!_0x4d1d31['_eventInitBox']){_0x4d1d31['_eventInitBox']=String(_0x325437['eventInitBox'])||'C[24]';}if(!_0x4d1d31['_eventInitBoxOffsetX']){_0x4d1d31['_eventInitBoxOffsetX']=Number(_0x325437['eventInitBoxOffsetX'])||0x0;}if(!_0x4d1d31['_eventInitBoxOffsetY']){_0x4d1d31['_eventInitBoxOffsetY']=Number(_0x325437['eventInitBoxOffsetY'])||0x0;}};QJ['BL']['setDefaultEventBox']=function(_0x448ee5,_0x3b7cbb,_0x123938){$gameVariables['_eventInitBox']=String(_0x448ee5)||'C[24]';$gameVariables['_eventInitBoxOffsetX']=Number(_0x3b7cbb)||0x0;$gameVariables['_eventInitBoxOffsetY']=Number(_0x123938)||0x0;for(let _0x30756b of $gameMap['events']()){_0x30756b['refreshBodyBox']();}};QJ['BL']['setPlayerBox']=function(_0x24034e,_0x1f04a8,_0x470c9e){$gameVariables['_playerInitBox']=String(_0x24034e)||'C[24]';$gameVariables['_playerInitBoxOffsetX']=Number(_0x1f04a8)||0x0;$gameVariables['_playerInitBoxOffsetY']=Number(_0x470c9e)||0x0;$gamePlayer['refreshBodyBox']();};Game_CharacterBase['prototype']['boxShiftY']=function(){return _0x2abc2a?this['isObjectCharacter']()?0x0:0x6:0x0;};Game_CharacterBase['prototype']['boxScreenSubX']=function(){return(this['_x']+0.5-$gameMap['displayX']())*_0x53ad7b+this['boxOffsetX'];};Game_CharacterBase['prototype']['boxScreenSubY']=function(){return(this['_y']+0.5-$gameMap['displayY']())*_0x53ad7b+this['boxOffsetY']-this['boxShiftY']();};Game_CharacterBase['prototype']['boxScreenSubRealX']=function(){return(this['_realX']+0.5-$gameMap['displayX']())*_0x53ad7b+this['boxOffsetX'];};Game_CharacterBase['prototype']['boxScreenSubRealY']=function(){return(this['_realY']+0.5-$gameMap['displayY']())*_0x53ad7b+this['boxOffsetY']-this['boxShiftY']();};Game_CharacterBase['prototype']['boxScreenX']=function(){return(this['_x']+0.5)*_0x53ad7b+this['boxOffsetX'];};Game_CharacterBase['prototype']['boxScreenY']=function(){return(this['_y']+0.5)*_0x53ad7b+this['boxOffsetY']-this['boxShiftY']();};Game_CharacterBase['prototype']['boxScreenRealX']=function(){return(this['_realX']+0.5)*_0x53ad7b+this['boxOffsetX'];};Game_CharacterBase['prototype']['boxScreenRealY']=function(){return(this['_realY']+0.5)*_0x53ad7b+this['boxOffsetY']-this['boxShiftY']();};const _0x13d713=Game_Character['prototype']['update'];Game_Character['prototype']['update']=function(){_0x13d713['call'](this);if(this['QJBody'])this['updateBodyPosition']();else this['refreshBodyBox']();if(this['shadowCircle'])this['updateShadowCirccle']();};Game_Character['prototype']['updateBodyPosition']=function(){QJ['BL']['setPostion'](this['QJBody'],this['boxScreenRealX'](),this['boxScreenRealY']());};Game_Character['prototype']['addShadowCircle']=function(_0x4c2f2f,_0x5d92e2,_0x5f4f25,_0x47fbaf){if(typeof _0x5f4f25=='number'){this['shadowCircle']=[0x0,0x1,_0x47fbaf,_0x5f4f25,_0x4c2f2f,_0x5d92e2];}else{if(_0x5f4f25[0x0]==0x0&&this==$gamePlayer)return;this['shadowCircle']=[0x1,0x1,_0x47fbaf,_0x5f4f25,_0x4c2f2f,_0x5d92e2];}this['updateShadowCirccle']();};Game_Character['prototype']['updateShadowCirccle']=function(){let _0x15a937=this['shadowCircle'];if(_0x15a937[0x0]==0x0){_0x15a937[0x1]--;if(_0x15a937[0x1]<=0x0){_0x15a937[0x3]--;_0x15a937[0x1]=_0x15a937[0x2];QJ['BL']['Shadow'](_0x15a937[0x4],_0x15a937[0x5]);if(_0x15a937[0x3]<=0x0){this['shadowCircle']=null;}}}else{if(QJ['BL']['dealTimeBoolean'](_0x15a937[0x3],this))this['shadowCircle']=null;else{_0x15a937[0x1]--;if(_0x15a937[0x1]<=0x0){_0x15a937[0x1]=_0x15a937[0x2];QJ['BL']['Shadow'](_0x15a937[0x4],_0x15a937[0x5]);}}}};Game_Character['prototype']['refreshBodyBox']=function(){};Game_Player['prototype']['refreshBodyBox']=function(){this['boxOffsetX']=$gameVariables['_playerInitBoxOffsetX'];this['boxOffsetY']=$gameVariables['_playerInitBoxOffsetY'];let _0x3a6240=$gameVariables['_playerInitBox'];this['QJBody']=QJ['BL']['box'](this['boxScreenX'](),this['boxScreenY'](),QJ['BL']['dealCollisionBox'](_0x3a6240));};Game_Event['prototype']['refreshBodyBox']=function(){let _0x344fc5='',_0x545dae;try{_0x344fc5=QJ['BL']['getAnnotation'](this);}catch(_0x2c4732){_0x344fc5='';}this['boxOffsetX']=$gameVariables['_eventInitBoxOffsetX'];this['boxOffsetY']=$gameVariables['_eventInitBoxOffsetY'];let _0x458628=$gameVariables['_eventInitBox'];_0x545dae=_0x344fc5['match'](/<BoxOffset:([^\,]+)\,([^\,\>]+)>/i);if(_0x545dae){if(!isNaN(Number(_0x545dae[0x1]))&&!isNaN(Number(_0x545dae[0x2]))){this['boxOffsetX']=Number(_0x545dae[0x1]);this['boxOffsetY']=Number(_0x545dae[0x2]);}}_0x545dae=_0x344fc5['match'](/<BoxType:([^\>]+)>/i);if(_0x545dae){_0x458628=eval(_0x545dae[0x1]);}_0x545dae=_0x344fc5['match'](/<laserObstacle>/i);if(_0x545dae){this['laserObstacle']=!![];}else this['laserObstacle']=![];this['QJBody']=QJ['BL']['box'](this['boxScreenX'](),this['boxScreenY'](),QJ['BL']['dealCollisionBox'](_0x458628));};Game_Vehicle['prototype']['refreshBodyBox']=function(){};Game_Follower['prototype']['refreshBodyBox']=function(){};const _0x561e38=Spriteset_Map['prototype']['createLowerLayer'];Spriteset_Map['prototype']['createLowerLayer']=function(){_0x561e38['call'](this);this['_collisionBoxSprite']=new _0x527e56();this['addChild'](this['_collisionBoxSprite']);};function _0x527e56(){this['initialize']['apply'](this,arguments);}_0x527e56['prototype']=Object['create'](Sprite['prototype']);_0x527e56['prototype']['constructor']=_0x527e56;_0x527e56['prototype']['initialize']=function(){Sprite['prototype']['initialize']['call'](this);this['visible']=_0x36ae94;this['bitmap']=new Bitmap(Graphics['width'],Graphics['height']);this['bitmap']['paintOpacity']=0x50;QJ['BL']['sprite']=this;};_0x527e56['prototype']['update']=function(){Sprite['prototype']['update']['call'](this);if(Input['isTriggered']('F10')){_0x36ae94=!_0x36ae94;this['bitmap']['clear']();this['visible']=_0x36ae94;}if(this['visible']){this['bitmap']['clear']();let _0x35bbe3=-$gameMap['displayX']()*_0x53ad7b;let _0x4529b8=-$gameMap['displayY']()*_0x53ad7b;if($gamePlayer['QJBody'])this['drawBody']($gamePlayer['QJBody'],this['bitmap']['_context'],_0x35bbe3,_0x4529b8,_0x41fa9b);for(let _0x2b6be0=0x0,_0x2a362b=$gameMap['_events'],_0x5196e9=_0x2a362b['length'];_0x2b6be0<_0x5196e9;_0x2b6be0++){if(!_0x2a362b[_0x2b6be0]||!_0x2a362b[_0x2b6be0]['QJBody'])continue;this['drawBody'](_0x2a362b[_0x2b6be0]['QJBody'],this['bitmap']['_context'],_0x35bbe3,_0x4529b8,_0x41fa9b);}for(let _0x52e9bf of _0xd01670){if(_0x52e9bf['length']!=0x2)continue;if(!$gameMap['_regionBox'][_0x52e9bf[0x0]])continue;this['drawBodies']($gameMap['_regionBox'][_0x52e9bf[0x0]],this['bitmap']['_context'],_0x35bbe3,_0x4529b8,_0x52e9bf[0x1]);}for(let _0x5ec97e of _0x29fe50){if(_0x5ec97e['length']!=0x2)continue;if(!$gameMap['_terrainBox'][_0x5ec97e[0x0]])continue;this['drawBodies']($gameMap['_terrainBox'][_0x5ec97e[0x0]],this['bitmap']['_context'],_0x35bbe3,_0x4529b8,_0x5ec97e[0x1]);}for(let _0x318e95 of $gameMap['_mapBullets']){if(!_0x318e95||!_0x318e95['QJBody'])continue;this['drawBody'](_0x318e95['QJBody'],this['bitmap']['_context'],_0x35bbe3,_0x4529b8);}}};_0x527e56['prototype']['aBody']=function(_0xe89ef0){this['bitmap']['clear']();let _0x51f336=-$gameMap['displayX']()*_0x53ad7b;let _0x20638d=-$gameMap['displayY']()*_0x53ad7b;this['drawBody'](_0xe89ef0,this['bitmap']['_context'],_0x51f336,_0x20638d);};_0x527e56['prototype']['drawBodies']=function(_0x2623eb,_0x5d1bc3,_0x522417,_0xefa4ce,_0xbc4d0c){for(let _0x205a50 of _0x2623eb){if(_0x205a50){this['drawBody'](_0x205a50,_0x5d1bc3,_0x522417,_0xefa4ce,_0xbc4d0c);}}};_0x527e56['prototype']['drawBody']=function(_0x4f4ede,_0x3206a3,_0x46fcfa,_0x28a409,_0x49a3df){let _0x1c497e=_0x4f4ede['pos']['x']+_0x46fcfa,_0x3137f4=_0x4f4ede['pos']['y']+_0x28a409;_0x3206a3['beginPath']();if(_0x4f4ede['type']==0x0){_0x3206a3['arc'](_0x1c497e,_0x3137f4,_0x4f4ede['r'],0x0,0x2*Math['PI']);}else if(_0x4f4ede['type']==0x1){let _0x1ce876=_0x4f4ede['calcPoints'];_0x3206a3['moveTo'](_0x1ce876[0x0]['x']+_0x1c497e,_0x1ce876[0x0]['y']+_0x3137f4);for(let _0x122d35=0x1,_0x3f937b=_0x1ce876['length'];_0x122d35<_0x3f937b;_0x122d35++){_0x3206a3['lineTo'](_0x1ce876[_0x122d35]['x']+_0x1c497e,_0x1ce876[_0x122d35]['y']+_0x3137f4);}_0x3206a3['lineTo'](_0x1ce876[0x0]['x']+_0x1c497e,_0x1ce876[0x0]['y']+_0x3137f4);}_0x3206a3['closePath']();_0x3206a3['fillStyle']=_0x49a3df?_0x49a3df:_0x4f4ede['color']?_0x4f4ede['color']:'#00FF00';_0x3206a3['fill']();_0x3206a3['lineWidth']=0x2;_0x3206a3['strokeStyle']='#000000';_0x3206a3['stroke']();};})();
//=============================================================================
//
//=============================================================================