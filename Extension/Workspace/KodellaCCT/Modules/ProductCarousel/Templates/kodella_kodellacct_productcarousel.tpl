<section class="productcarousel-info-card">
    <span class="productcarousel-info-card-content">
      {{message}}
    </span>
</section>


<div class="kdl_cct_products">
  <div class="container" id="cct-shop-products">
    <div class="KDShopTheStoryHeader row">
      <div class="col-md-4">
      </div>
      <div class="KDShopTheStoryTitle col-md-4 ">
        <span>{{header}}</span>
      </div>
      <div class="col-md-4">
      </div>
    </div>
    {{#if isMobile}}
    <div class="bxslider">
        {{#each items}}
          <div class="product-container col-xs-6 col-sm-4">
          <div class="facets-item-cell-grid" data-type="item" data-item-id="{{_id}}" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/Product" data-track-productlist-list="" data-track-productlist-category="" data-track-productlist-position="" data-sku="{{_sku}}">
            <meta itemprop="url" content="{{_url}}">
            <div id="global-product-main-img" class="facets-item-cell-grid-image-wrapper" style="
              height: 100%;
              /* overflow: hidden; */
              position: relative;">

              <!-- RESTOCK -->
              {{#unless _isInStock}}
                <i style="
                  position: absolute;
                  z-index: 900;
                  right: 20px;
                  width: 80px;
                  text-align: center;
                  top: 20px;
                ">Restock Coming Soon!</i>
              {{/unless}}
              <div id="global-product-select-size" class="global-product-select-size" style="z-index: 998; display: none; opacity: 1;">

                {{#if isinstock}}
                  <div>
                    <a href="#" id="global-product-add-to-bag" class="kd-heading-1" data-action="add-to-cart" data-value="{{internalid}}">ADD TO BAG</a>
                    <div style="
                      position: absolute;
                      /* top: 0; */
                      bottom: -50px;
                      z-index: 998;
                      right: 0;
                      "><div class="kd-details" style="text-align: right;">{{_price_formatted}}</div>
                    </div>
                  </div>
                {{else}}
                      <span id="global-product-select-size-label" class="kd-heading-1">OUT OF STOCK</span>
              {{/if}}
              </div>
              <a id="" class="facets-item-cell-grid-link-image" href="{{_url}}" style="">
                <img class="facets-item-cell-grid-image kdl-animate" src="{{_thumbnail.url}}" alt="" itemprop="image">
              </a>
            </div>
          </div>
          <div class="kd-details facets-item-cell-grid-details">
            <a href="{{_url}}" data-touchpoing="home">
              <span class="" itemprop="name">{{_name}}</span>
            </a>
          </div>
        {{/each}}
    </div>

    {{else}}
     <div class="facets-items-collection-view-row row">
    {{#each items}}
      <div class="product-container col-xs-6 col-sm-4">
        <div class="facets-item-cell-grid" data-type="item" data-item-id="{{_id}}" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/Product" data-track-productlist-list="" data-track-productlist-category="" data-track-productlist-position="" data-sku="{{_sku}}">
          <meta itemprop="url" content="{{_url}}">
          <div id="global-product-main-img" class="facets-item-cell-grid-image-wrapper" style="
            height: 100%;
            /* overflow: hidden; */
            position: relative;">

            <!-- RESTOCK -->
            {{#unless _isInStock}}
              <i style="
                position: absolute;
                z-index: 900;
                right: 20px;
                width: 80px;
                text-align: center;
                top: 20px;
              ">Restock Coming Soon!</i>
            {{/unless}}
            <div id="global-product-select-size" class="global-product-select-size" style="z-index: 998; display: none; opacity: 1;">

              {{#if isinstock}}
                <div>
                  <a href="#" id="global-product-add-to-bag" class="kd-heading-1" data-action="add-to-cart" data-value="{{internalid}}">ADD TO BAG</a>
                  <div style="
                    position: absolute;
                    /* top: 0; */
                    bottom: -50px;
                    z-index: 998;
                    right: 0;
                    "><div class="kd-details" style="text-align: right;">{{_price_formatted}}</div>
                  </div>
                </div>
              {{else}}
                    <span id="global-product-select-size-label" class="kd-heading-1">OUT OF STOCK</span>
            {{/if}}
            </div>
            <a id="" class="facets-item-cell-grid-link-image" href="{{_url}}" style="">
              <img class="facets-item-cell-grid-image kdl-animate" src="{{_thumbnail.url}}" alt="" itemprop="image">
            </a>
          </div>
        </div>
        <div class="kd-details facets-item-cell-grid-details">
          <a href="{{_url}}" data-touchpoing="home">
            <span class="" itemprop="name">{{_name}}</span>
          </a>

          {{#if ../../inMobileView}}
            {{#if _matrixChilds.length}}
              <div style="text-align: left;">{{_matrixChilds.models.[0].onlinecustomerprice_detail.onlinecustomerprice_formatted}}</div>
              {{else}}
              <div style="text-align: left;">{{_price_formatted}}</div>
            {{/if}}
          {{/if}}
        </div>
      </div>
    {{/each}}
    </div>



    {{/if}}



    <a href="{{linkurl}}" class="cta products__cta see-all-products">{{linklabel}}</a>
  </div>
</div>

<script>


var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.onload = function() {
    $(".kdl_cct_products .bxslider").bxSlider({
          responsive: true,
          controls: false,
          pager: true,
          stopAutoOnClick: true,
          slideWidth: 600,
          touchEnabled: true,
          infiniteLoop: true,
          onSliderLoad: function (currentIndex) {
            $(".kdl_cct_products .bxslider")
              .children()
              .eq(currentIndex + 1)
              .addClass("active-slide");
          },
          onSlideAfter: function ($slideElement) {
            $(".kdl_cct_products .bxslider").children().removeClass("active-slide");
            $slideElement.addClass("active-slide");
          },
        });
}
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.1.2/jquery.bxslider.min.js';
head.appendChild(script);




</script>
<!--
Available helpers:
{{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension

{{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder

{{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme

{{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->
