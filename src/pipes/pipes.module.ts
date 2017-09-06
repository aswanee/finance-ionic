import { NgModule } from '@angular/core';
import { LimitToPipe } from './../pipes/limit-to/limit-to';
import { aroundToPipe } from './../pipes/around-to/around-to';
@NgModule({
	declarations: [LimitToPipe , aroundToPipe],
	imports: [],
	exports: [LimitToPipe , aroundToPipe]
})
export class PipesModule {}
