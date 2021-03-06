import m from 'mithril';

import {menu} from './#menu.js';
import {footerItem} from './#footer.js';
import {footerLink} from './#footer.js';


import Icons from '../#icons.js';
import {pageTitle} from '../#pageComponents.js';
import {defaultImage} from '../#pageFunctions.js';
import {displayImage} from '../#pageFunctions.js';

import {switchPageMode} from '../#pageFunctions.js';
import {saveForm} from '../#pageFunctions.js';

var viewHeader = {
	view: function(vnode){
		return (
			m("nav",{class:"w-100 bg-secondary dark-red shadow-4 z-5 cf tc relative fixed top-0"},[
				m("a",{class:"link",href:"/dashboard"},[
					m(Icons,{name:"dashboard",class:"absolute dark-red h1 dim left-0 top-0 pa3"})
				]),
				m("p", {class:"avenir"}, "MY PROFILE"),
				m(Icons,{name:"pencil",class:"absolute dark-red h1 dim right-0 top-0 pa3 pointer",onclick:page.editForm}),
			])
		)
	}
}

var editHeader = {
	view: function(vnode){
		return (
			m("nav",{class:"w-100 bg-secondary dark-red shadow-4 z-5 cf tc relative fixed top-0"},[
				m(Icons,{name:"chevron-left",class:"absolute dark-red h1 dim left-0 top-0 pa3 pointer",onclick:page.viewForm}),
				m("p", {class:"avenir"}, "EDIT MY PROFILE"),
				m(Icons,{name:"check",class:"absolute dark-red h1 dim right-0 top-0 pa3",onclick:page.saveForm}),
			])
		)
	}
}

var page = {
	Url: "/api/profile", Form: {},
	editForm:function(){
		switchPageMode(page, "edit");
		m.render(document.getElementById('appMenu'), m(editHeader));
	},
	viewForm:function(){
		switchPageMode(page, "view");
		m.render(document.getElementById('appMenu'), m(viewHeader));
	},
	saveForm:function(){ saveForm(page); },
	oninit: function() {
		m.render(document.getElementById('appMenu'), m(viewHeader));
		document.getElementById("appContent").style.paddingTop = "53px";
		m.redraw()
	},
	oncreate:function(){ switchPageMode(page, "view"); defaultImage("Image")},
	view:function(){
	return  (
		<section>

			<div id="appAlert"></div>
			<div class="cf w-100 pv2"></div>

			<section id="formView" class={"cf center w-100 w-90-m w-40-l pv2 avenir near-white "+page.formView}>

				<div class="fl w-100 ">
					<header class="tc pv2">
						{m("input",{ type:"file", disabled: page.editMode, class: "dn", id: "imageFile",value: "",
							onchange: function(event){displayImage(event, page.Form, "Image")}})}
						{m("img",{class: "br-100 pa1 ba b--gray h4 w4 pointer", style:"", id: "Image", src:page.Form.Image,
							onerror: m.withAttr("id",function(id){ defaultImage(id); }),
							onclick:function(){document.getElementById("imageFile").click()}
						})}

						<h2 class="f5 f4-ns fw4 mid-gray pb0 mb0"> {page.Form.Fullname} </h2>
						<h2 class="f6 gray fw2 tracked i pt0 mt0">{page.Form.Username} </h2>
					</header>
				</div>


				<div class="fl w-100 gray">
					<div class="cf w-100 pa2 f6 fw5">
						Private Details
					</div>

					<div class="cf w-100">
						<div class="fl w-50 pa2"> <small class="gray b">Fullname:</small>
							{m("input",{ type: "text", class: "w-100 pa1", disabled: "disabled", value:page.Form.Fullname,
								onchange: m.withAttr("value",function(value) {page.Form.Fullname = value}) })}
						</div>

						<div class="fl w-50 pa2"> <small class="gray b">Mobile:</small>
							{m("input",{ type: "text", class: "w-100 pa1", disabled: page.editMode, value:page.Form.Mobile,
								onchange: m.withAttr("value",function(value) {page.Form.Mobile = value}) })}
						</div>

						<div class="fl w-100 pa2"> <small class="gray b">Email:</small>
							{m("input",{ type: "text", class: "w-100 pa1", disabled: page.editMode, value:page.Form.Email,
								onchange: m.withAttr("value",function(value) {page.Form.Email = value}) })}
						</div>
					</div>

					<div class="cf w-100" style="">
						<div class="fl w-100 pa2"> <small class="gray b">About Me:</small>
							{m("textarea",{ class: "w-100 h3 tl pa2 ba b--black-10", disabled: page.editMode, value:page.Form.Description,
								onchange: m.withAttr("value",function(value) {page.Form.Description = value}) })}
						</div>
					</div>
				</div>

			</section>


			{m("div",{class:"cf w-100 pv5"})}

			{m("nav",{class:"avenir w-100 z-max fixed bg-primary bottom-0 tc center"},[
				m(footerItem,{color:"red bg-white", href:"/dashboard/profile",icon:"person"},"My Profile"),
				m(footerItem,{color:"near-white hover-bg-white hover-red", href:"/dashboard/password",icon:"lock-locked"},"Set Password"),
				m(footerItem,{color:"near-white hover-bg-white hover-red", href:"/dashboard/history",icon:"spreadsheet"},"Security Log"),
				m(footerLink,{color:"near-white hover-bg-white hover-red", href:"/logout",icon:"logout"},"Logout")
			])}
		</section>
	)
  }
}

export default page;
