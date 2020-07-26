import {User} from '../../model/entities/user';
import {isEmpty} from '../../utils/validate';
import {EditProfile} from './EditProfile';
import {downloadCurrentUserData} from '../../model/dbinteractor/users/dbinteractor';
import takePhoto from '../Home/AddNewPost/Utils/TakePhoto';

export class ModelView {
  private _user: User;
  private _imageUrl: string;
  private _localImagePath: string;
  private readonly _update: () => void;
  private readonly _view: EditProfile;

  constructor(view: EditProfile, user: User, update: () => void) {
    this._view = view;
    this._user = user;
    this._update = update;
    this._imageUrl = null;
    this._localImagePath = null;
    this.submitData = this.submitData.bind(this);
  }

  configure() {
    downloadCurrentUserData((_user) => {
      this.currentUserDataDidDownload(_user);
    });
  }

  updateView() {
    this._update();
  }

  currentUserDataDidDownload(user: User) {
    if (user === null) {
      return;
    }
    this.user = user;
    this._view.setTitle(this.title);
    this.updateView();
    this.getAvatarUrl().then((url) => {
      this._imageUrl = url;
      this.updateView();
    });
  }

  selectAvatar() {
    takePhoto()
      .then((url) => {
        this.imageUrl = url;
        this.localImagePath = url;
        this.updateView();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  set user(newValue: User) {
    this._user = newValue;
  }

  get user(): User {
    return this._user;
  }

  get title(): string {
    return this.name;
  }

  // Name
  get name(): string {
    return this._user.username === undefined ? '' : this._user.username;
  }

  set name(newValue) {
    this._user.username = newValue;
    this._view.setTitle(this.title);
    this.updateView();
  }

  // Address
  get address(): string {
    return this._user.address;
  }

  set address(newValue) {
    this._user.address = newValue;
    this.updateView();
  }

  // Gender
  get gender(): string {
    return this._user.gender === null ? '' : this._user.gender.toString();
  }

  set gender(newValue) {
    if (isEmpty(newValue)) {
      this._user.gender = null;
    } else {
      this._user.gender = +newValue;
    }
    this.updateView();
  }

  get genderCategories(): Array<any> {
    return [
      {
        id: '2',
        title: 'Female',
      },
      {
        id: '1',
        title: 'Male',
      },
    ]
  };

  // Year of birth
  get yearBirth(): string {
    return this._user.yearbirth === null ? '' : this._user.yearbirth.toString();
  }

  set yearBirth(newValue) {
    if (isEmpty(newValue)) {
      this._user.yearbirth = null;
    } else {
      this._user.yearbirth = +newValue;
    }
    this.updateView();
  }

  // Email
  get email(): string {
    return this._user.email;
  }

  set email(newValue) {
    this._user.email = newValue;
    this.updateView();
  }

  // Image
  set imageUrl(newValue: string) {
    this._imageUrl = newValue;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  set localImagePath(newValue: string) {
    this._localImagePath = newValue;
  }

  getAvatarUrl(): Promise<string> {
    return this._user.getAvatarUrl();
  }

  textEditFields(): Array<TextEditItem> {
    return [
      {
        key: 'name',
        label: 'Name:',
        placeholder: 'Type your name',
        value: this.name,
        onChangeText: (text) => {
          this.name = text;
        },
        onSelectItem: (_) => {},
      },
      {
        key: 'address',
        label: 'Address:',
        placeholder: 'Type your address',
        value: this.address,
        onChangeText: (text) => {
          this.address = text;
        },
        onSelectItem: (_) => {},
      },
      {
        key: 'sex',
        label: 'Gender:',
        placeholder: 'Type your gender',
        value: Number(this.gender) === 1 ? 'Male' : 'Female',
        onChangeText: (text) => {
          this.gender = text;
        },
        onSelectItem: (category) => {
          this.gender = category === 'Male' ? '1' : '2';
        },
      },
      {
        key: 'year_birth',
        label: 'Year:',
        placeholder: 'Type your year of birth',
        value: this.yearBirth,
        onChangeText: (text) => {
          this.yearBirth = text;
        },
        onSelectItem: (_) => {},
      },
      {
        key: 'email',
        label: 'Email:',
        placeholder: 'Type your email',
        value: this.email,
        onChangeText: (text) => {
          this.email = text;
        },
        onSelectItem: (_) => {},
      },
    ];
  }

  // Send user data on server
  submitData() {
    // const _this = this;
    return new Promise((resolve, reject) => {
      if (isEmpty(this.name)) {
        reject('Please, enter your name');
      } else {
        this._user.update(this._localImagePath, (result) => {
          resolve();
        });
      }
    });
  }
}

export interface TextEditItem {
  key: string;
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onSelectItem: (text: string) => void;
}
