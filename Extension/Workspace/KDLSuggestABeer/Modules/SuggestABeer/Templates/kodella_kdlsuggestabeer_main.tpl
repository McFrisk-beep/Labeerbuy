<section class="sab-container">
    <div class="sab-questions">
      <div class="sabq-img">
        <img src="{{getExtensionAssetsPath "img/kdl-drinkbg.svg"}}" alt="" />
      </div>
      <div class="sabq-content">
        <div>
          <h1>{{translate "Making <span>pour</span> decisions?"}}</h1>
          <h2 class="sab-note">{{translate 'Tell us your deepest thirst.'}}</h2>
          <div class="separator-line"><div class="separator-box"></div></div>
          <p>Answer atleast one question below</p>
          <div class="sab-fields-container">
            {{#each beerQuestions}}
              <div class="sab-field-group">
                <span>{{label}}</span>
                <input name='sab-field-{{@index}}' data-fields={{field}} data-operator={{operator}}>
              </div>
            {{/each}}
          </div>

          <div class="sab-field-group">
            <a href="#" class="sab-submit button-primary button-large">{{translate 'Get Suggestions'}}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="sab-items">
      <h1>{{translate  'Get drunk below'}}</h1>
      <div class="sab-rlist" data-view="Sab.Items"></div>
    </div>
</section>

<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension

  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder

  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme

  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->
