{{!-- Edited for Posh Theme --}}

<script type="text/javascript">
$(document).ready( function(){
	$(".header-menu-level-container").css("position", "fixed");
	$(".header-menu-level-container").css("top", $(".shopping-layout-header").height());
	$(".header-menu-level-container").css("left", "0");
});
</script>
<nav class="header-menu-secondary-nav">

	<ul class="header-menu-level1">

		{{#each categories}}
			{{#if text}}
				<li {{#if categories}}data-toggle="categories-menu"{{/if}}>
					<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
					{{#if categories}}
					<ul class="header-menu-level-container" 
					style="
					position: fixed;
				    top: 77px;
				    left: 0px;
				    /* right: 0px; */
				    /*border: solid 1px red;*/
				    width: -webkit-fill-available;
				    height: 300px;
				    background-color: white;
				    padding-top: 35px;
					">
						<li>
							<ul class="header-menu-level2" 
							style="
							display: flex;
						    justify-content: center;
							">
								{{#each categories}}
								<li {{#if categories}}class="categories-menu-arrow"{{/if}}
								style="
								/*border: solid 1px blue;*/
    							display: flex;
    							margin-right: 20px;
    							max-width: 350px;">
									<!-- <img src="{{resizeImage getThemeAssetsPath 'img/default.jpg'}}" /> -->
									<img src="{{getThemeAssetsPath 'img/default.jpg'}}?resizeid=12&resizeh=150&resizew=225" />
									<a class="{{class}}" {{objectToAtrributes this}}>
										<div>{{translate text}}</div>
										<hr><i style="
									    max-width: 200px;
									    text-align: center;">"Proin risus dui, lobortis ut nunc eu, euismod tempus purus."</i>
									</a>
										{{#if categories}}
											<ul class="header-menu-level3">
												{{#each categories}}
												<li>
													<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
												</li>
												{{/each}}
											</ul>
										{{/if}}
								</li>
								{{/each}}
							</ul>
						</li>
					</ul>
					{{/if}}
				</li>
			{{/if}}
		{{/each}}
	</ul>
</nav>




{{!----
Use the following context variables when customizing this template:

	categories (Array)
	showExtendedMenu (Boolean)
	showLanguages (Boolean)
	showCurrencies (Boolean)

----}}
