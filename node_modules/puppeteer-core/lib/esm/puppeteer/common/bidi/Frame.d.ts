/**
 * Copyright 2023 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Frame as BaseFrame } from '../../api/Frame.js';
import { PuppeteerLifeCycleEvent } from '../LifecycleWatcher.js';
import { EvaluateFunc, HandleFor } from '../types.js';
import { BrowsingContext } from './BrowsingContext.js';
import { HTTPResponse } from './HTTPResponse.js';
import { Page } from './Page.js';
/**
 * Puppeteer's Frame class could be viewed as a BiDi BrowsingContext implementation
 * @internal
 */
export declare class Frame extends BaseFrame {
    #private;
    _id: string;
    constructor(page: Page, context: BrowsingContext, parentId?: string | null);
    page(): Page;
    name(): string;
    url(): string;
    parentFrame(): Frame | null;
    childFrames(): Frame[];
    evaluateHandle<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<HandleFor<Awaited<ReturnType<Func>>>>;
    evaluate<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
    goto(url: string, options?: {
        referer?: string | undefined;
        referrerPolicy?: string | undefined;
        timeout?: number | undefined;
        waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[] | undefined;
    } | undefined): Promise<HTTPResponse | null>;
    setContent(html: string, options: {
        timeout?: number;
        waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
    }): Promise<void>;
    content(): Promise<string>;
    title(): Promise<string>;
    context(): BrowsingContext;
    dispose(): void;
}
//# sourceMappingURL=Frame.d.ts.map