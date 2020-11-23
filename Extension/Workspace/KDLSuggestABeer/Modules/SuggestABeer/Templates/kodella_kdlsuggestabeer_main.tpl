<section class="sab-container">
    <h1>{{translate 'Suggest A Beer'}}</h1>
    <span class="sab-note">{{translate 'Please answer atleast one question below.'}}</span>

    <div class="sab-fields-container">
    {{#each beerQuestions}}
      <div class="sab-field-group">
        <span>{{label}}</span>
        <br/>
        <input name='sab-field-{{@index}}' data-fields={{field}} data-operator={{operator}}>
      </div>
    {{/each}}

      <div class="sab-field-group">
        <a href="#" class="sab-submit btn-primary">{{translate 'Get Suggestions'}}</a>
      </div>
    </div>

    <div class="sab-items" data-view="Sab.Items"></div>
</section>


<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension

  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder

  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme

  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->
