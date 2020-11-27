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
								<li class="kdl-menu-header">
									<img src="{{resizeImage categoryimage 'navigation'}}" /> 
								</li>
								{{#each categories}}
								<!-- <li {{#if categories}}class="categories-menu-arrow"{{/if}}> -->
								<li class="kdl-menu-list">
									<!-- <a class="{{class}}" {{objectToAtrributes this}}> -->
									<a {{objectToAtrributes this}}>
										<div>{{translate text}}</div>
										<!-- <i class="header-menu-level-2-text">"Proin risus dui, lobortis ut nunc eu, euismod tempus purus."</i> -->
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
								<li class="kdl-menu-header">
									<img src="{{resizeImage brandimage 'navigation'}}" /> 
								</li>
								{{#each brand}}
								<li class="kdl-menu-list">
									<a href="{{href}}">
										<div>{{translate text}}</div>
									</a>
								</li>
								{{/each}}
							</ul>
							<ul class="header-menu-level2">
								<li class="kdl-menu-header">BESTSELLERS</li>
								<li class="kdl-menu-header">
									<img src="{{resizeImage bestsellerimage 'navigation'}}" /> 
								</li>
								{{#each bestseller}}
								<li class="kdl-menu-list">
									<a href="{{href}}">
										<div>{{translate text}}</div>
									</a>
								</li>
								{{/each}}
							</ul>
							<ul class="header-menu-level2"
								style="
								display: flex;
							    background: url('{{resizeImage shopimage 'navigation_side'}}');
							    width: 400px;">
								<li class="kdl-menu-header">
									<div style="
									    position: absolute;
									">
										<a class="button-primary button-large" {{objectToAtrributes this}}>SHOP NOW</a>
									</div>
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
