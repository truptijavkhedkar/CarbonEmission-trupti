import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';

import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgxCaptchaService} from  '@binssoft/ngx-captcha';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    protected aFormGroup: FormGroup;

    @HostBinding('class') class = 'login-box';
    captchaStatus:any = null;
    captchaResponse = '';
    captchaConfig:any = {
    length:7 ,
    cssClass:'myCaptcha',
    back: {
     
     solid:"#212529",
     width:'30px',
     height:'20px'
   } ,
   placeHolder:'text',
    font:{
    color:"#ffffff",
    size:"35px"
   }
   };
    loginForm!:FormGroup;
    public isAuthLoading = false;
    

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private captchaService:NgxCaptchaService,
        private appService: AppService,
        private fb:FormBuilder,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        
        this.renderer.addClass(
            document.querySelector('app-root'),
            'test'
        );
        this.loginForm = this.fb.group({
            email: ['',Validators.required],
            password: ['', Validators.required],
            captcha: ['', Validators.required]
        
          });
          
          this.captchaService.captchStatus.subscribe((status)=>{
            this.captchaStatus= status;
            console.log("status",status);
            if (status == false) {
                this.toastr.error("Captcha mismatch");
            } else  if (status == true) {
                this.toastr.success("Captcha validated");
            }
          });
       
    }



   
      

    async loginByAuth() {
        if (this.loginForm.valid) {
            this.isAuthLoading = true;
            await this.appService.loginByAuth(this.loginForm.value);
            this.isAuthLoading = false;
        } else {
            this.toastr.error('Form is not valid!');
        }
    }

    // async loginByGoogle() {
    //     this.isGoogleLoading = true;
    //     await this.appService.loginByGoogle();
    //     this.isGoogleLoading = false;
    // }

    // async loginByFacebook() {
    //     this.isFacebookLoading = true;
    //     await this.appService.loginByFacebook();
    //     this.isFacebookLoading = false;
    // }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
