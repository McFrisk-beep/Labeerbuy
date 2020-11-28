<div class="sab-itemcell">
  <div style="text-align: center;">
    <a href="{{url}}" class="hvr-float-shadow">
      <img src="{{resizeImage thumb 'thumbnail'}}" />
    </a>
    <p class="sab-name"><a href="{{url}}" ><span>{{name}}</span></a></p>
    {{#if showprice}}
      <div class="sab-item-price" data-view="Item.Price"></div>
      {{#if showRating}}
      <div class="sab-item-rate" data-view="Global.StarRating"></div>
      {{/if}}
    {{else}}
      <p>{{translate 'Logged in to see price'}}</p>
    {{/if}}

  </div>
</div>
