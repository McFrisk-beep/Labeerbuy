{{!-- Edited for Posh Theme --}}

<script type="text/javascript">
$(document).ready( function(){
	//$(".header-menu-level-container").css("position", "fixed");
	//$(".header-menu-level-container").css("top", $(".shopping-layout-header").height());
	//$(".header-menu-level-container").css("left", "0");
});
</script>
<nav class="header-menu-secondary-nav">

	<ul class="header-menu-level1">

		{{#each categories}}
			{{#if text}}

				{{#unless parentId}}
				<li {{#if categories}}data-toggle="categories-menu"{{/if}}>
					<a class="{{class}}" {{objectToAtrributes this}}>{{translate text}}</a>
					{{#if categories}}
					<ul class="header-menu-level-container">
						<li style="
						display: flex;
    					justify-content: center;">
							<ul class="header-menu-level2">
								<li class="kdl-menu-header">SHOP BY CATEGORY</li>
								<li class="kdl-menu-header"><hr></li>
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
							<ul class="header-menu-level2">
								<li class="kdl-menu-header">SHOP BY BRAND</li>
								<li class="kdl-menu-header"><hr></li>
								{{#each brand}}
								<li>
									<a href="{{href}}"class="header-menu-level2-anchor">
										<div>{{translate text}}</div>
									</a>
								</li>
								{{/each}}
							</ul>
							<ul class="header-menu-level2">
								<li class="kdl-menu-header">FEATURED PRODUCT</li>
								<li class="kdl-menu-header"><hr></li>
								<li>
									<a href="{{item}}"class="header-menu-level2-anchor">
										<img src="{{resizeImage featuredimage 'tinythumb'}}" />
									</a>
								</li>
							</ul>
						</li>
					</ul>
					{{/if}}
				</li>
				{{/unless}}

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
