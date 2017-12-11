# Material Design
## Introduction
Material Design is a design language developed by Google, and its goal is nicely captured by the following statement from <https://material.io/guidelines/#introduction-goals>

> Develop a single underlying system that allows for a unified experience across platforms and device sizes.

Material Design can be thought of as an alternative to Bootstrap. Many platforms now offer UI components that follows Material Design. Angular 2 is one of them. (Not to be confused with AngularJS)

The Angular 2 Material Design is a UI Component framework and a reference implementation of the Google's Material Design Specification, consisting of a wide variety of reusable, well-tested and accessible UI components that can be used in Angular 2. A quickstart on using Angular 2 Material Design components can be found on <https://material.angular.io/guide/getting-started>. It must be used on an Angular 2 project (duh)

## Great User Experience
Material Design is able to deliver a consistent and pleasant user experience to all who is interacting with the web app. There are 3 main features described by Material Design that make their design stand out from others:
#### Material is the metaphor
> The material is grounded in tactile reality, inspired by the study of paper and ink
> The use of familiar tactile attributes helps users quickly understand affordances. Yet the flexibility of the material creates new affordances that supersede those in the physical world, without breaking the rules of physics.

#### Bold, graphic, intentional
> Deliberate color choices, edge-to-edge imagery, large-scale typography, and intentional white space create a bold and graphic interface that immerse the user in the experience.

#### Motion provides meaning
> Motion is meaningful and appropriate, serving to focus attention and maintain continuity. Feedback is subtle yet clear. Transitions are efﬁcient yet coherent.

## Ease of Implementation
More than the user benefits, Material Design has also been increasingly easy for developers to use and implement onto their web apps. Angular 2 Material Design has a comprehensive guide and documentation on <https://material.angular.io/>

There are different implementations for different UI components, for instance, to create a Material Design button, simply add the directive `mat-button` to the button component in your html like so:
```<button mat-button>Button Title</button>```

Including a tooltip is also as simple as the following:
```<span matTooltip="Tooltip!">I have a tooltip</span>```

Other components' implementation, some more complicated than the others, can be found on <https://material.angular.io/components/categories>

## Examples of Implementation in SUTD AppStore
The SUTD AppStore project utilises many Material Design UI components. There are [Buttons](https://material.angular.io/components/button/overview), [Input Fields](https://material.angular.io/components/input/overview), [Material Icons](https://material.angular.io/components/icon/overview), [Dialogs](https://material.angular.io/components/dialog/overview), [Snackbars](https://material.angular.io/components/snack-bar/overview), [Cards](https://material.angular.io/components/card/overview), [Tabs](https://material.angular.io/components/tabs/overview), [Tooltips](https://material.angular.io/components/tooltip/overview) and [Selects](https://material.angular.io/components/select/overview). 

Below is an implementation of how SUTD AppStore used Tabs to display Sales Performance by the different developers and games:
```
<mat-tab-group>
  <mat-tab label="Popular Apps">
    <canvas class="apps-chart" baseChart #appsChart="base-chart" [datasets]="barChartAppsData" [labels]="barChartAppsLabel" [options]="barChartOptions"
      [legend]="barChartLegend" [chartType]="barChartType" [colors]="barColors" (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>
  </mat-tab>
  <mat-tab label="Popular Developers">
    <canvas class="dev-chart" baseChart #devChart="base-chart" [datasets]="barChartDevData" [labels]="barChartDevLabel" [options]="barChartOptions"
      [legend]="barChartLegend" [chartType]="barChartType" [colors]="barColors" (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>
  </mat-tab>
  <mat-tab label="Popular Genre">
    <canvas class="genre-chart" baseChart #genreChart="base-chart" [datasets]="barChartGenreData" [labels]="barChartGenreLabel"
      [options]="barChartOptions" [legend]="barChartLegend" [chartType]="barChartType" [colors]="barColors" (chartHover)="chartHovered($event)"
      (chartClick)="chartClicked($event)"></canvas>
  </mat-tab>
</mat-tab-group>

```
