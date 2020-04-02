<template>
    <lightning-card>
        <h3 slot="title">
            <lightning-icon icon-name="utility:connected_apps" size="small"></lightning-icon>
            Tags
        </h3>
        <div slot="footer">
            <template if:true={atags} >
                <template for:each={atags} for:item="atag">        
                    <lightning-pill data-id={atag.linkRecId} key={atag.Id} label={atag.Name} onremove={handleRemoveOnly}>
                        <lightning-icon src={atag.icon}></lightning-icon>
                    </lightning-pill>        
                </template>
            </template>    
        </div>
        <p class="slds-p-horizontal_small">

            <template if:true={hideTags}>
                <lightning-layout-item padding="around-small"  >
                        <template if:true={parentEditAccess}>                
                            <lightning-button variant="base" label="Add Tags" onclick={handleShowTagClick} class="slds-m-left_x-small"></lightning-button>                            
                        </template>                
                        <template if:false={parentEditAccess}>
                            <div class="slds-text-heading_x-small">
                                Tags
                            </div>
                        </template>    
                </lightning-layout-item>
                </template>    

                <template if:false={hideTags}>
                
                        <template if:true={parentEditAccess}>
                    
                            <template if:true={showCategory}>
                                
                            <div class="slds-form-element__control slds-p-bottom_x_medium" >
                                <template if:true={catOptions}>
                                <lightning-combobox
                                name="Category"
                                label=""
                                value={selcat}
                                placeholder="Select Category"
                                options={catOptions}
                                onchange={handleCatChange} >
                                </lightning-combobox>
                                </template>
                            </div>    
                            
                            </template>
                            
                            <div class="slds-form-element__control">
                                <input data-id="taginput" name="input" list="valueList" placeholder="Select Tag" class="slds-input taginput" type="text" value={value} onchange={handleChange}  />
                                <datalist id="valueList" class="valueList">
                                <template if:true={tags}>
                                    <template for:each={tags} for:item='tag'>
                                        <option key={tag.Id} value={tag.Name}></option>
                                    </template>
                                </template>
                                </datalist>
                            </div>
                    
                        </template>
                
                </template>                    
        </p>
    </lightning-card>    

    <br/>

    <div class="slds-card">
    <lightning-layout  multiple-rows="true">
    <template if:true={hideTags}>
    <lightning-layout-item padding="around-small"  >
            <template if:true={parentEditAccess}>                
                <lightning-button variant="base" label="Add Tags" onclick={handleShowTagClick} class="slds-m-left_x-small"></lightning-button>                            
            </template>                
            <template if:false={parentEditAccess}>
                <div class="slds-text-heading_x-small">
                    Tags
                </div>
            </template>    
    </lightning-layout-item>
    </template>    

    <template if:false={hideTags}>
    <lightning-layout-item  size="12" padding="around-medium">

        <template if:true={parentEditAccess}>
    
            <template if:true={showCategory}>
                
            <div class="slds-form-element__control slds-p-bottom_x_medium" >
                <template if:true={catOptions}>
                <lightning-combobox
                name="Category"
                label=""
                value={selcat}
                placeholder="Select Category"
                options={catOptions}
                onchange={handleCatChange} >
                </lightning-combobox>
                </template>
            </div>    
            
            </template>
            
            <div class="slds-form-element__control">
                <input data-id="taginput" name="input" list="valueList" placeholder="Select Tag" class="slds-input taginput" type="text" value={value} onchange={handleChange}  />
                <datalist id="valueList" class="valueList">
                <template if:true={tags}>
                    <template for:each={tags} for:item='tag'>
                        <option key={tag.Id} value={tag.Name}></option>
                    </template>
                </template>
                </datalist>
            </div>
    
        </template>
    </lightning-layout-item>

</template>    

<lightning-layout-item >        
    
    <template if:true={atags} >
        <template for:each={atags} for:item="atag">        
            <lightning-pill data-id={atag.linkRecId} key={atag.Id} label={atag.Name} onremove={handleRemoveOnly}>
                <lightning-icon src={atag.icon}></lightning-icon>
            </lightning-pill>        
        </template>
    </template>    
    
    </lightning-layout-item>

</lightning-layout>
    </div>
</template>