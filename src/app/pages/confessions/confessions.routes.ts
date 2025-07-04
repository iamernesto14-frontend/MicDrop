import { Route } from "@angular/router";
import { ConfessionComponent } from "./confession/confession.component";

export const CONFESSIONS_ROUTES: Route[] = [
    {
        path: '',
        component: ConfessionComponent, title: 'Confess Anonymously'
    }
]