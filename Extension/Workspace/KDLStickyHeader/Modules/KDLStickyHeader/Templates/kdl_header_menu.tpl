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
					<ul class="header-menu-level-container">
						<li style="
						display: flex;
    					justify-content: center;">
							<ul class="header-menu-level2" style="margin-right: 15px;">
								<li style="padding: 7px 20px;">SHOP BY CATEGORY</li>
								<li style="padding: 7px 20px;"><hr style="width: 100%; height: 5px;"></li>
								{{#each categories}}
								<li {{#if categories}}class="categories-menu-arrow"{{/if}}>
									<!-- <img src="{{resizeImage getThemeAssetsPath 'img/default.jpg'}}" /> -->
									<!-- <img src="{{getThemeAssetsPath 'img/default.jpg'}}?resizeid=12&resizeh=150&resizew=225" /> -->
									<a class="{{class}}" {{objectToAtrributes this}}>
										<div>{{translate text}}</div>
										<!-- <hr>
										<i class="header-menu-level-2-text">"Proin risus dui, lobortis ut nunc eu, euismod tempus purus."</i> -->
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
							<ul class="header-menu-level2" style="margin-right: 15px;">
								<li style="padding: 7px 20px;">SHOP BY BRAND</li>
								<li style="padding: 7px 20px;"><hr style="width: 100%; height: 5px;"></li>
								<li>
									<a href="#"class="header-menu-level2-anchor">
										<div>Coors</div>
									</a>
								</li>
								<li>
									<a href="#"class="header-menu-level2-anchor">
										<div>Engkanto</div>
									</a>
								</li>
								<li>
									<a href="#"class="header-menu-level2-anchor">
										<div>Tiger</div>
									</a>
								</li>
							</ul>
							<ul class="header-menu-level2" style="margin-right: 15px;">
								<li style="padding: 7px 20px;">FEATURED PRODUCT</li>
								<li style="padding: 7px 20px;"><hr style="width: 100%; height: 5px;"></li>
								<li>
									<a href="#"class="header-menu-level2-anchor">
										<img src="{{getThemeAssetsPath 'img/default.jpg'}}?resizeid=12&resizeh=150&resizew=225" />
									</a>
								</li>
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
