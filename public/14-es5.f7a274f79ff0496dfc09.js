(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"/yGZ":function(l,n,u){"use strict";u.r(n);var e=u("CcnG"),t=u("mrSG"),i=u("ZZ/e"),r=u("lGQG"),o=function(){function l(l,n,u,e){this.alertController=l,this.loadingCtrl=n,this.router=u,this.authService=e,this.slideOpts={initialSlide:0,slidesPerView:1,autoplay:!1,loop:!1,centeredSlides:!0,speed:800},this.usuario={nombre:"",pass:"",passConfirm:"",correo:""}}return l.prototype.ngOnInit=function(){},l.prototype.ionViewDidEnter=function(){this.slide.lockSwipes(!0)},l.prototype.loginFace=function(){return t.__awaiter(this,void 0,void 0,function(){var l,n;return t.__generator(this,function(u){switch(u.label){case 0:return[4,this.presentLoading()];case 1:u.sent(),u.label=2;case 2:return u.trys.push([2,4,,5]),[4,this.authService.facebookLogin()];case 3:return l=u.sent(),console.log(l),this.loader.dismiss(),this.router.navigate(["/"]),[3,5];case 4:return n=u.sent(),console.log(n),this.presentAlert("Error","Algo sali\xf3 mal, por favor intenta de nuevo"),[3,5];case 5:return[2]}})})},l.prototype.ingresarConCorreo=function(){return t.__awaiter(this,void 0,void 0,function(){var l;return t.__generator(this,function(n){switch(n.label){case 0:return[4,this.presentLoading()];case 1:n.sent(),n.label=2;case 2:return n.trys.push([2,4,,5]),[4,this.authService.loginWithEmail(this.correo,this.pass)];case 3:return n.sent(),this.loader.dismiss(),this.router.navigate(["/"]),[3,5];case 4:return l=n.sent(),console.log(l),"auth/user-not-found"===l.code?this.presentAlert("Usuario no registrado","Por favor registra una cuenta antes de ingresar"):this.presentAlert("Error","Algo sali\xf3 mal, por favor intenta de nuevo"),[3,5];case 5:return[2]}})})},l.prototype.generarCuenta=function(){return t.__awaiter(this,void 0,void 0,function(){var l;return t.__generator(this,function(n){switch(n.label){case 0:return[4,this.presentLoading()];case 1:n.sent(),n.label=2;case 2:return n.trys.push([2,4,,5]),[4,this.authService.registraUsuario(this.usuario)];case 3:return n.sent(),this.loader.dismiss(),this.router.navigate(["/"]),[3,5];case 4:return l=n.sent(),console.log(l),this.presentAlert("Error","Algo sali\xf3 mal, por favor intenta de nuevo"),[3,5];case 5:return[2]}})})},l.prototype.resetPass=function(){return t.__awaiter(this,void 0,void 0,function(){return t.__generator(this,function(l){switch(l.label){case 0:if(!this.correo)return this.presentAlert("Ingresa tu correo","Enviaremos un enlace a tu correo, en el cu\xe1l podr\xe1s restaurar tu contrase\xf1a"),[2];this.presentLoading(),l.label=1;case 1:return l.trys.push([1,3,,4]),[4,this.authService.resetPass(this.correo)];case 2:return l.sent(),this.presentAlert("Listo","Por favor revisa tu correo, hemos enviado un enlace para que puedas restaurar tu contrase\xf1a"),[3,4];case 3:return l.sent(),this.presentAlert("Error","Por favor intenta de nuevo m\xe1s tarde. Estamos teniendo problemas t\xe9cnicos"),[3,4];case 4:return[2]}})})},l.prototype.mostrarFormularioCuenta=function(){this.slide.lockSwipes(!1),this.slide.slideNext(),this.slide.lockSwipes(!0)},l.prototype.regresar=function(){this.slide.lockSwipes(!1),this.slide.slidePrev(),this.slide.lockSwipes(!0)},l.prototype.presentAlert=function(l,n){return t.__awaiter(this,void 0,void 0,function(){return t.__generator(this,function(u){switch(u.label){case 0:return this.loader&&this.loader.dismiss(),[4,this.alertController.create({header:l,message:n,buttons:["OK"]})];case 1:return[4,u.sent().present()];case 2:return u.sent(),[2]}})})},l.prototype.presentLoading=function(){return t.__awaiter(this,void 0,void 0,function(){var l;return t.__generator(this,function(n){switch(n.label){case 0:return l=this,[4,this.loadingCtrl.create({spinner:"crescent"})];case 1:return l.loader=n.sent(),[4,this.loader.present()];case 2:return[2,n.sent()]}})})},l}(),a=function(){return function(){}}(),s=u("pMnS"),b=u("oBZk"),d=u("gIcY"),g=u("ZYCi"),c=e.sb({encapsulation:0,styles:[["ion-content.background[_ngcontent-%COMP%]{--background:url('login.014f25d596c0aa946346.png') 0 0/100% 100% no-repeat;--webkit-background-size:cover}.btn-salir[_ngcontent-%COMP%]{position:absolute;left:2px;top:2px}.formulario[_ngcontent-%COMP%]{position:absolute;margin-top:1rem;width:100%}.mr-5[_ngcontent-%COMP%]{margin-right:.5rem}.hr[_ngcontent-%COMP%]{border-bottom:1px solid var(--ion-color-medium)}"]],data:{}});function h(l){return e.Pb(0,[e.Lb(671088640,1,{slide:0}),(l()(),e.ub(1,0,null,null,170,"ion-content",[["class","background"]],null,null,null,b.H,b.h)),e.tb(2,49152,null,0,i.s,[e.h,e.k,e.z],null,null),(l()(),e.ub(3,0,null,0,168,"ion-slides",[],null,null,null,b.U,b.u)),e.tb(4,49152,[[1,4]],0,i.pb,[e.h,e.k,e.z],{options:[0,"options"]},null),(l()(),e.ub(5,0,null,0,92,"ion-slide",[],null,null,null,b.T,b.t)),e.tb(6,49152,null,0,i.ob,[e.h,e.k,e.z],null,null),(l()(),e.ub(7,0,null,0,90,"div",[["style","width: 100vw; height: 100vh"]],null,null,null,null,null)),(l()(),e.ub(8,0,null,null,89,"ion-grid",[["fixed",""],["style","width: 75vw"]],null,null,null,b.J,b.j)),e.tb(9,49152,null,0,i.y,[e.h,e.k,e.z],{fixed:[0,"fixed"]},null),(l()(),e.ub(10,0,null,0,4,"ion-row",[],null,null,null,b.S,b.s)),e.tb(11,49152,null,0,i.hb,[e.h,e.k,e.z],null,null),(l()(),e.ub(12,0,null,0,2,"ion-col",[["size","12"]],null,null,null,b.G,b.g)),e.tb(13,49152,null,0,i.r,[e.h,e.k,e.z],{size:[0,"size"]},null),(l()(),e.ub(14,0,null,0,0,"img",[["alt",""],["src","../../assets/img/logo.png"]],null,null,null,null,null)),(l()(),e.ub(15,0,null,0,6,"ion-row",[],null,null,null,b.S,b.s)),e.tb(16,49152,null,0,i.hb,[e.h,e.k,e.z],null,null),(l()(),e.ub(17,0,null,0,4,"ion-col",[["size","12"]],null,null,null,b.G,b.g)),e.tb(18,49152,null,0,i.r,[e.h,e.k,e.z],{size:[0,"size"]},null),(l()(),e.ub(19,0,null,0,2,"ion-label",[["color","medium"],["style","font-size: 10pt"]],null,null,null,b.P,b.p)),e.tb(20,49152,null,0,i.L,[e.h,e.k,e.z],{color:[0,"color"]},null),(l()(),e.Nb(-1,0,["Inicia sesi\xf3n antes de continuar"])),(l()(),e.ub(22,0,null,0,8,"ion-row",[],null,null,null,b.S,b.s)),e.tb(23,49152,null,0,i.hb,[e.h,e.k,e.z],null,null),(l()(),e.ub(24,0,null,0,6,"ion-col",[["size","12"]],null,null,null,b.G,b.g)),e.tb(25,49152,null,0,i.r,[e.h,e.k,e.z],{size:[0,"size"]},null),(l()(),e.ub(26,0,null,0,4,"ion-button",[["expand","block"],["shape","round"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.loginFace()&&e),e},b.D,b.d)),e.tb(27,49152,null,0,i.i,[e.h,e.k,e.z],{expand:[0,"expand"],shape:[1,"shape"]},null),(l()(),e.ub(28,0,null,0,1,"ion-icon",[["class","mr-5"],["name","logo-facebook"]],null,null,null,b.L,b.l)),e.tb(29,49152,null,0,i.A,[e.h,e.k,e.z],{name:[0,"name"]},null),(l()(),e.Nb(-1,0,[" Continuar con Facebook "])),(l()(),e.ub(31,0,null,0,12,"ion-row",[],null,null,null,b.S,b.s)),e.tb(32,49152,null,0,i.hb,[e.h,e.k,e.z],null,null),(l()(),e.ub(33,0,null,0,2,"ion-col",[["size","5"]],null,null,null,b.G,b.g)),e.tb(34,49152,null,0,i.r,[e.h,e.k,e.z],{size:[0,"size"]},null),(l()(),e.ub(35,0,null,0,0,"hr",[["class","hr"]],null,null,null,null,null)),(l()(),e.ub(36,0,null,0,4,"ion-col",[["size","2"]],null,null,null,b.G,b.g)),e.tb(37,49152,null,0,i.r,[e.h,e.k,e.z],{size:[0,"size"]},null),(l()(),e.ub(38,0,null,0,2,"ion-label",[["color","medium"]],null,null,null,b.P,b.p)),e.tb(39,49152,null,0,i.L,[e.h,e.k,e.z],{color:[0,"color"]},null),(l()(),e.Nb(-1,0,["o"])),(l()(),e.ub(41,0,null,0,2,"ion-col",[["size","5"]],null,null,null,b.G,b.g)),e.tb(42,49152,null,0,i.r,[e.h,e.k,e.z],{size:[0,"size"]},null),(l()(),e.ub(43,0,null,0,0,"hr",[["class","hr"]],null,null,null,null,null)),(l()(),e.ub(44,0,null,0,42,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,u){var t=!0,i=l.component;return"submit"===n&&(t=!1!==e.Fb(l,46).onSubmit(u)&&t),"reset"===n&&(t=!1!==e.Fb(l,46).onReset()&&t),"submit"===n&&(t=!1!==i.ingresarConCorreo()&&t),t},null,null)),e.tb(45,16384,null,0,d.q,[],null,null),e.tb(46,4210688,[["forma",4]],0,d.k,[[8,null],[8,null]],null,null),e.Kb(2048,null,d.b,null,[d.k]),e.tb(48,16384,null,0,d.j,[[4,d.b]],null,null),(l()(),e.ub(49,0,null,null,14,"ion-item",[],null,null,null,b.O,b.o)),e.tb(50,49152,null,0,i.F,[e.h,e.k,e.z],null,null),(l()(),e.ub(51,0,null,0,2,"ion-label",[["color","medium"],["position","floating"]],null,null,null,b.P,b.p)),e.tb(52,49152,null,0,i.L,[e.h,e.k,e.z],{color:[0,"color"],position:[1,"position"]},null),(l()(),e.Nb(-1,0,["Correo"])),(l()(),e.ub(54,0,null,0,9,"ion-input",[["name","email"],["pattern","[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$"],["required",""],["type","email"]],[[1,"required",0],[1,"pattern",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,u){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==e.Fb(l,58)._handleBlurEvent(u.target)&&t),"ionChange"===n&&(t=!1!==e.Fb(l,58)._handleInputEvent(u.target)&&t),"ngModelChange"===n&&(t=!1!==(i.correo=u)&&t),t},b.N,b.n)),e.tb(55,16384,null,0,d.n,[],{required:[0,"required"]},null),e.tb(56,540672,null,0,d.m,[],{pattern:[0,"pattern"]},null),e.Kb(1024,null,d.f,function(l,n){return[l,n]},[d.n,d.m]),e.tb(58,16384,null,0,i.Kb,[e.k],null,null),e.Kb(1024,null,d.g,function(l){return[l]},[i.Kb]),e.tb(60,671744,null,0,d.l,[[2,d.b],[6,d.f],[8,null],[6,d.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Kb(2048,null,d.h,null,[d.l]),e.tb(62,16384,null,0,d.i,[[4,d.h]],null,null),e.tb(63,49152,null,0,i.E,[e.h,e.k,e.z],{name:[0,"name"],pattern:[1,"pattern"],required:[2,"required"],type:[3,"type"]},null),(l()(),e.ub(64,0,null,null,14,"ion-item",[],null,null,null,b.O,b.o)),e.tb(65,49152,null,0,i.F,[e.h,e.k,e.z],null,null),(l()(),e.ub(66,0,null,0,2,"ion-label",[["color","medium"],["position","floating"]],null,null,null,b.P,b.p)),e.tb(67,49152,null,0,i.L,[e.h,e.k,e.z],{color:[0,"color"],position:[1,"position"]},null),(l()(),e.Nb(-1,0,["Contrase\xf1a"])),(l()(),e.ub(69,0,null,0,9,"ion-input",[["minlength","5"],["name","telefono"],["required",""],["type","password"]],[[1,"required",0],[1,"minlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,u){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==e.Fb(l,73)._handleBlurEvent(u.target)&&t),"ionChange"===n&&(t=!1!==e.Fb(l,73)._handleInputEvent(u.target)&&t),"ngModelChange"===n&&(t=!1!==(i.pass=u)&&t),t},b.N,b.n)),e.tb(70,16384,null,0,d.n,[],{required:[0,"required"]},null),e.tb(71,540672,null,0,d.e,[],{minlength:[0,"minlength"]},null),e.Kb(1024,null,d.f,function(l,n){return[l,n]},[d.n,d.e]),e.tb(73,16384,null,0,i.Kb,[e.k],null,null),e.Kb(1024,null,d.g,function(l){return[l]},[i.Kb]),e.tb(75,671744,null,0,d.l,[[2,d.b],[6,d.f],[8,null],[6,d.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Kb(2048,null,d.h,null,[d.l]),e.tb(77,16384,null,0,d.i,[[4,d.h]],null,null),e.tb(78,49152,null,0,i.E,[e.h,e.k,e.z],{minlength:[0,"minlength"],name:[1,"name"],required:[2,"required"],type:[3,"type"]},null),(l()(),e.ub(79,0,null,null,4,"ion-item",[["lines","none"]],null,null,null,b.O,b.o)),e.tb(80,49152,null,0,i.F,[e.h,e.k,e.z],{lines:[0,"lines"]},null),(l()(),e.ub(81,0,null,0,2,"ion-label",[["color","medium"],["style","font-size: 8pt; text-align: right"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.resetPass()&&e),e},b.P,b.p)),e.tb(82,49152,null,0,i.L,[e.h,e.k,e.z],{color:[0,"color"]},null),(l()(),e.Nb(-1,0,["\xbfOlvidaste tu contrase\xf1a?"])),(l()(),e.ub(84,0,null,null,2,"ion-button",[["expand","block"],["shape","round"],["type","submit"]],null,null,null,b.D,b.d)),e.tb(85,49152,null,0,i.i,[e.h,e.k,e.z],{disabled:[0,"disabled"],expand:[1,"expand"],shape:[2,"shape"],type:[3,"type"]},null),(l()(),e.Nb(-1,0,[" Iniciar sesi\xf3n "])),(l()(),e.ub(87,0,null,0,10,"ion-row",[],null,null,null,b.S,b.s)),e.tb(88,49152,null,0,i.hb,[e.h,e.k,e.z],null,null),(l()(),e.ub(89,0,null,0,8,"ion-col",[["size","12"]],null,null,null,b.G,b.g)),e.tb(90,49152,null,0,i.r,[e.h,e.k,e.z],{size:[0,"size"]},null),(l()(),e.ub(91,0,null,0,2,"ion-label",[["color","medium"],["style","font-size: 10pt; margin-right: 1rem"]],null,null,null,b.P,b.p)),e.tb(92,49152,null,0,i.L,[e.h,e.k,e.z],{color:[0,"color"]},null),(l()(),e.Nb(-1,0,["\xbfNo tienes una cuenta?"])),(l()(),e.ub(94,0,null,0,3,"ion-label",[["color","primary"],["style","font-size: 10pt"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.mostrarFormularioCuenta()&&e),e},b.P,b.p)),e.tb(95,49152,null,0,i.L,[e.h,e.k,e.z],{color:[0,"color"]},null),(l()(),e.ub(96,0,null,0,1,"strong",[],null,null,null,null,null)),(l()(),e.Nb(-1,null,["Reg\xedstrate"])),(l()(),e.ub(98,0,null,0,73,"ion-slide",[],null,null,null,b.T,b.t)),e.tb(99,49152,null,0,i.ob,[e.h,e.k,e.z],null,null),(l()(),e.ub(100,0,null,0,4,"div",[["class","btn-salir"]],null,null,null,null,null)),(l()(),e.ub(101,0,null,null,3,"ion-button",[["fill","clear"],["slot","start"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.regresar()&&e),e},b.D,b.d)),e.tb(102,49152,null,0,i.i,[e.h,e.k,e.z],{fill:[0,"fill"]},null),(l()(),e.ub(103,0,null,0,1,"ion-icon",[["color","primary"],["name","arrow-back"],["slot","icon-only"]],null,null,null,b.L,b.l)),e.tb(104,49152,null,0,i.A,[e.h,e.k,e.z],{color:[0,"color"],name:[1,"name"]},null),(l()(),e.ub(105,0,null,0,66,"form",[["novalidate",""],["style","margin-top: 2rem"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,u){var t=!0,i=l.component;return"submit"===n&&(t=!1!==e.Fb(l,107).onSubmit(u)&&t),"reset"===n&&(t=!1!==e.Fb(l,107).onReset()&&t),"submit"===n&&(t=!1!==i.generarCuenta()&&t),t},null,null)),e.tb(106,16384,null,0,d.q,[],null,null),e.tb(107,4210688,[["formaCuenta",4]],0,d.k,[[8,null],[8,null]],null,null),e.Kb(2048,null,d.b,null,[d.k]),e.tb(109,16384,null,0,d.j,[[4,d.b]],null,null),(l()(),e.ub(110,0,null,null,13,"ion-item",[],null,null,null,b.O,b.o)),e.tb(111,49152,null,0,i.F,[e.h,e.k,e.z],null,null),(l()(),e.ub(112,0,null,0,2,"ion-label",[["color","medium"],["position","floating"]],null,null,null,b.P,b.p)),e.tb(113,49152,null,0,i.L,[e.h,e.k,e.z],{color:[0,"color"],position:[1,"position"]},null),(l()(),e.Nb(-1,0,["Nombre"])),(l()(),e.ub(115,0,null,0,8,"ion-input",[["name","nombre"],["required",""],["type","text"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,u){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==e.Fb(l,118)._handleBlurEvent(u.target)&&t),"ionChange"===n&&(t=!1!==e.Fb(l,118)._handleInputEvent(u.target)&&t),"ngModelChange"===n&&(t=!1!==(i.usuario.nombre=u)&&t),t},b.N,b.n)),e.tb(116,16384,null,0,d.n,[],{required:[0,"required"]},null),e.Kb(1024,null,d.f,function(l){return[l]},[d.n]),e.tb(118,16384,null,0,i.Kb,[e.k],null,null),e.Kb(1024,null,d.g,function(l){return[l]},[i.Kb]),e.tb(120,671744,null,0,d.l,[[2,d.b],[6,d.f],[8,null],[6,d.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Kb(2048,null,d.h,null,[d.l]),e.tb(122,16384,null,0,d.i,[[4,d.h]],null,null),e.tb(123,49152,null,0,i.E,[e.h,e.k,e.z],{name:[0,"name"],required:[1,"required"],type:[2,"type"]},null),(l()(),e.ub(124,0,null,null,14,"ion-item",[],null,null,null,b.O,b.o)),e.tb(125,49152,null,0,i.F,[e.h,e.k,e.z],null,null),(l()(),e.ub(126,0,null,0,2,"ion-label",[["color","medium"],["position","floating"]],null,null,null,b.P,b.p)),e.tb(127,49152,null,0,i.L,[e.h,e.k,e.z],{color:[0,"color"],position:[1,"position"]},null),(l()(),e.Nb(-1,0,["Correo"])),(l()(),e.ub(129,0,null,0,9,"ion-input",[["name","email"],["pattern","[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$"],["required",""],["type","email"]],[[1,"required",0],[1,"pattern",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,u){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==e.Fb(l,133)._handleBlurEvent(u.target)&&t),"ionChange"===n&&(t=!1!==e.Fb(l,133)._handleInputEvent(u.target)&&t),"ngModelChange"===n&&(t=!1!==(i.usuario.correo=u)&&t),t},b.N,b.n)),e.tb(130,16384,null,0,d.n,[],{required:[0,"required"]},null),e.tb(131,540672,null,0,d.m,[],{pattern:[0,"pattern"]},null),e.Kb(1024,null,d.f,function(l,n){return[l,n]},[d.n,d.m]),e.tb(133,16384,null,0,i.Kb,[e.k],null,null),e.Kb(1024,null,d.g,function(l){return[l]},[i.Kb]),e.tb(135,671744,null,0,d.l,[[2,d.b],[6,d.f],[8,null],[6,d.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Kb(2048,null,d.h,null,[d.l]),e.tb(137,16384,null,0,d.i,[[4,d.h]],null,null),e.tb(138,49152,null,0,i.E,[e.h,e.k,e.z],{name:[0,"name"],pattern:[1,"pattern"],required:[2,"required"],type:[3,"type"]},null),(l()(),e.ub(139,0,null,null,14,"ion-item",[],null,null,null,b.O,b.o)),e.tb(140,49152,null,0,i.F,[e.h,e.k,e.z],null,null),(l()(),e.ub(141,0,null,0,2,"ion-label",[["color","medium"],["position","floating"]],null,null,null,b.P,b.p)),e.tb(142,49152,null,0,i.L,[e.h,e.k,e.z],{color:[0,"color"],position:[1,"position"]},null),(l()(),e.Nb(-1,0,["Contrase\xf1a (m\xednimo 5 caracteres)"])),(l()(),e.ub(144,0,null,0,9,"ion-input",[["minlength","5"],["name","pass"],["required",""],["type","password"]],[[1,"required",0],[1,"minlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,u){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==e.Fb(l,148)._handleBlurEvent(u.target)&&t),"ionChange"===n&&(t=!1!==e.Fb(l,148)._handleInputEvent(u.target)&&t),"ngModelChange"===n&&(t=!1!==(i.usuario.pass=u)&&t),t},b.N,b.n)),e.tb(145,16384,null,0,d.n,[],{required:[0,"required"]},null),e.tb(146,540672,null,0,d.e,[],{minlength:[0,"minlength"]},null),e.Kb(1024,null,d.f,function(l,n){return[l,n]},[d.n,d.e]),e.tb(148,16384,null,0,i.Kb,[e.k],null,null),e.Kb(1024,null,d.g,function(l){return[l]},[i.Kb]),e.tb(150,671744,null,0,d.l,[[2,d.b],[6,d.f],[8,null],[6,d.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Kb(2048,null,d.h,null,[d.l]),e.tb(152,16384,null,0,d.i,[[4,d.h]],null,null),e.tb(153,49152,null,0,i.E,[e.h,e.k,e.z],{minlength:[0,"minlength"],name:[1,"name"],required:[2,"required"],type:[3,"type"]},null),(l()(),e.ub(154,0,null,null,14,"ion-item",[],null,null,null,b.O,b.o)),e.tb(155,49152,null,0,i.F,[e.h,e.k,e.z],null,null),(l()(),e.ub(156,0,null,0,2,"ion-label",[["color","medium"],["position","floating"]],null,null,null,b.P,b.p)),e.tb(157,49152,null,0,i.L,[e.h,e.k,e.z],{color:[0,"color"],position:[1,"position"]},null),(l()(),e.Nb(-1,0,["Confirma contrase\xf1a"])),(l()(),e.ub(159,0,null,0,9,"ion-input",[["minlength","5"],["name","passConfirm"],["required",""],["type","password"]],[[1,"required",0],[1,"minlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],function(l,n,u){var t=!0,i=l.component;return"ionBlur"===n&&(t=!1!==e.Fb(l,163)._handleBlurEvent(u.target)&&t),"ionChange"===n&&(t=!1!==e.Fb(l,163)._handleInputEvent(u.target)&&t),"ngModelChange"===n&&(t=!1!==(i.usuario.passConfirm=u)&&t),t},b.N,b.n)),e.tb(160,16384,null,0,d.n,[],{required:[0,"required"]},null),e.tb(161,540672,null,0,d.e,[],{minlength:[0,"minlength"]},null),e.Kb(1024,null,d.f,function(l,n){return[l,n]},[d.n,d.e]),e.tb(163,16384,null,0,i.Kb,[e.k],null,null),e.Kb(1024,null,d.g,function(l){return[l]},[i.Kb]),e.tb(165,671744,null,0,d.l,[[2,d.b],[6,d.f],[8,null],[6,d.g]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e.Kb(2048,null,d.h,null,[d.l]),e.tb(167,16384,null,0,d.i,[[4,d.h]],null,null),e.tb(168,49152,null,0,i.E,[e.h,e.k,e.z],{minlength:[0,"minlength"],name:[1,"name"],required:[2,"required"],type:[3,"type"]},null),(l()(),e.ub(169,0,null,null,2,"ion-button",[["expand","block"],["shape","round"],["style","margin-top: 2rem"],["type","submit"]],null,null,null,b.D,b.d)),e.tb(170,49152,null,0,i.i,[e.h,e.k,e.z],{disabled:[0,"disabled"],expand:[1,"expand"],shape:[2,"shape"],type:[3,"type"]},null),(l()(),e.Nb(-1,0,[" Crear cuenta "]))],function(l,n){var u=n.component;l(n,4,0,u.slideOpts),l(n,9,0,""),l(n,13,0,"12"),l(n,18,0,"12"),l(n,20,0,"medium"),l(n,25,0,"12"),l(n,27,0,"block","round"),l(n,29,0,"logo-facebook"),l(n,34,0,"5"),l(n,37,0,"2"),l(n,39,0,"medium"),l(n,42,0,"5"),l(n,52,0,"medium","floating"),l(n,55,0,""),l(n,56,0,"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$"),l(n,60,0,"email",u.correo),l(n,63,0,"email","[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$","","email"),l(n,67,0,"medium","floating"),l(n,70,0,""),l(n,71,0,"5"),l(n,75,0,"telefono",u.pass),l(n,78,0,"5","telefono","","password"),l(n,80,0,"none"),l(n,82,0,"medium"),l(n,85,0,!e.Fb(n,46).valid,"block","round","submit"),l(n,90,0,"12"),l(n,92,0,"medium"),l(n,95,0,"primary"),l(n,102,0,"clear"),l(n,104,0,"primary","arrow-back"),l(n,113,0,"medium","floating"),l(n,116,0,""),l(n,120,0,"nombre",u.usuario.nombre),l(n,123,0,"nombre","","text"),l(n,127,0,"medium","floating"),l(n,130,0,""),l(n,131,0,"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$"),l(n,135,0,"email",u.usuario.correo),l(n,138,0,"email","[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$","","email"),l(n,142,0,"medium","floating"),l(n,145,0,""),l(n,146,0,"5"),l(n,150,0,"pass",u.usuario.pass),l(n,153,0,"5","pass","","password"),l(n,157,0,"medium","floating"),l(n,160,0,""),l(n,161,0,"5"),l(n,165,0,"passConfirm",u.usuario.passConfirm),l(n,168,0,"5","passConfirm","","password"),l(n,170,0,!e.Fb(n,107).valid,"block","round","submit")},function(l,n){l(n,44,0,e.Fb(n,48).ngClassUntouched,e.Fb(n,48).ngClassTouched,e.Fb(n,48).ngClassPristine,e.Fb(n,48).ngClassDirty,e.Fb(n,48).ngClassValid,e.Fb(n,48).ngClassInvalid,e.Fb(n,48).ngClassPending),l(n,54,0,e.Fb(n,55).required?"":null,e.Fb(n,56).pattern?e.Fb(n,56).pattern:null,e.Fb(n,62).ngClassUntouched,e.Fb(n,62).ngClassTouched,e.Fb(n,62).ngClassPristine,e.Fb(n,62).ngClassDirty,e.Fb(n,62).ngClassValid,e.Fb(n,62).ngClassInvalid,e.Fb(n,62).ngClassPending),l(n,69,0,e.Fb(n,70).required?"":null,e.Fb(n,71).minlength?e.Fb(n,71).minlength:null,e.Fb(n,77).ngClassUntouched,e.Fb(n,77).ngClassTouched,e.Fb(n,77).ngClassPristine,e.Fb(n,77).ngClassDirty,e.Fb(n,77).ngClassValid,e.Fb(n,77).ngClassInvalid,e.Fb(n,77).ngClassPending),l(n,105,0,e.Fb(n,109).ngClassUntouched,e.Fb(n,109).ngClassTouched,e.Fb(n,109).ngClassPristine,e.Fb(n,109).ngClassDirty,e.Fb(n,109).ngClassValid,e.Fb(n,109).ngClassInvalid,e.Fb(n,109).ngClassPending),l(n,115,0,e.Fb(n,116).required?"":null,e.Fb(n,122).ngClassUntouched,e.Fb(n,122).ngClassTouched,e.Fb(n,122).ngClassPristine,e.Fb(n,122).ngClassDirty,e.Fb(n,122).ngClassValid,e.Fb(n,122).ngClassInvalid,e.Fb(n,122).ngClassPending),l(n,129,0,e.Fb(n,130).required?"":null,e.Fb(n,131).pattern?e.Fb(n,131).pattern:null,e.Fb(n,137).ngClassUntouched,e.Fb(n,137).ngClassTouched,e.Fb(n,137).ngClassPristine,e.Fb(n,137).ngClassDirty,e.Fb(n,137).ngClassValid,e.Fb(n,137).ngClassInvalid,e.Fb(n,137).ngClassPending),l(n,144,0,e.Fb(n,145).required?"":null,e.Fb(n,146).minlength?e.Fb(n,146).minlength:null,e.Fb(n,152).ngClassUntouched,e.Fb(n,152).ngClassTouched,e.Fb(n,152).ngClassPristine,e.Fb(n,152).ngClassDirty,e.Fb(n,152).ngClassValid,e.Fb(n,152).ngClassInvalid,e.Fb(n,152).ngClassPending),l(n,159,0,e.Fb(n,160).required?"":null,e.Fb(n,161).minlength?e.Fb(n,161).minlength:null,e.Fb(n,167).ngClassUntouched,e.Fb(n,167).ngClassTouched,e.Fb(n,167).ngClassPristine,e.Fb(n,167).ngClassDirty,e.Fb(n,167).ngClassValid,e.Fb(n,167).ngClassInvalid,e.Fb(n,167).ngClassPending)})}function p(l){return e.Pb(0,[(l()(),e.ub(0,0,null,null,1,"app-login",[],null,null,null,h,c)),e.tb(1,114688,null,0,o,[i.a,i.Eb,g.m,r.a],null,null)],function(l,n){l(n,1,0)},null)}var m=e.qb("app-login",o,p,{},{},[]),C=u("Ip0R");u.d(n,"LoginPageModuleNgFactory",function(){return f});var f=e.rb(a,[],function(l){return e.Cb([e.Db(512,e.j,e.cb,[[8,[s.a,m]],[3,e.j],e.x]),e.Db(4608,C.m,C.l,[e.u,[2,C.u]]),e.Db(4608,d.p,d.p,[]),e.Db(4608,i.b,i.b,[e.z,e.g]),e.Db(4608,i.Fb,i.Fb,[i.b,e.j,e.q]),e.Db(4608,i.Jb,i.Jb,[i.b,e.j,e.q]),e.Db(1073742336,C.b,C.b,[]),e.Db(1073742336,d.o,d.o,[]),e.Db(1073742336,d.d,d.d,[]),e.Db(1073742336,i.Cb,i.Cb,[]),e.Db(1073742336,g.n,g.n,[[2,g.s],[2,g.m]]),e.Db(1073742336,a,a,[]),e.Db(1024,g.k,function(){return[[{path:"",component:o}]]},[])])})}}]);