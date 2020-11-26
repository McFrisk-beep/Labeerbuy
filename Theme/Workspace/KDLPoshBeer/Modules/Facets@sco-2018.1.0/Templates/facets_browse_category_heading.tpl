{{!-- Edited for Posh Theme --}}

<section class="facets-browse-category-heading-list-header">
	<div class="facets-browse-category-heading-main-description">
		{{#if hasBanner}}
			<!-- <div class="facets-browse-category-heading-main-image">
				<img src="{{banner}}">
			</div> -->

			<div class="kdl-facets-header" style="background-image: url({{banner}});">
				<div class ="kdl-facets-text-overlay">
					<h1>{{pageheading}}</h1>
					{{#if showDescription}}	
						<p>{{{description}}}</p>
					{{/if}}
				</div>
			</div>
		{{/if}}	
	<!-- 	<h1>{{pageheading}}</h1> -->
		
	</div>
    <hr class="facets-browse-category-heading-divider-mobile" />
</section>




{{!----
Use the following context variables when customizing this template: 
	
	name (String)
	banner (String)
	description (String)
	pageheading (String)
	hasBanner (Boolean)
	showDescription (Boolean)

----}}
