import React, { Component } from 'react';
import './App.css';

import AES from './AES';
import ECIES from './ECIES';
import S4 from './S4';
import ipfs from './ipfs';
import { eeaClient } from './web3'
import { abi, bytecode } from './contractInfo';
import BigNumber from 'bignumber.js';
import { signtx } from './sign';

class App extends Component {

  state = {
    id: '',
    pk: '',
    pii: '',
    piihash: '',
    Ken: '',
    contractAddress: "0xF5BC34261a51D6ab74E290bBF5B867a14f3CA7BD",

    // how to get from besu?
    rpcendpoint: 'https://besu-daoiam-7ede584982-node-d1d7bae6.baas.twcc.ai', 
    jwtToken: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJTdUg1eDBQMndueWVnXzRjOXNodXcwSWF0aGtydm9fenpONlhNcXRORGdJIn0.eyJleHAiOjE2NDE2MTM0MDksImlhdCI6MTYyNjA2MTQwOSwianRpIjoiYWEyYmNiMGQtNGUzMS00NTE2LTkxMGMtOWYyOTljNzUxZTg2IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5iYWFzLnR3Y2MuYWkvYXV0aC9yZWFsbXMvbmN0dSIsInN1YiI6IjQyZjYwNTJiLTQ4MjItNDk0NC1iMGFhLTRjNTk2Nzg1MTAzMSIsInR5cCI6IkJlYXJlciIsImF6cCI6InB1YmxpYy1wb3J0YWwiLCJzZXNzaW9uX3N0YXRlIjoiMzg1ZjE4NzUtY2RlMC00MDVjLWEzNjAtZmUwMzE1YzM0MDM0IiwiYWNyIjoiMSIsInNjb3BlIjoib3BlbmlkIGdyb3VwcyIsInByZWZlcnJlZF91c2VybmFtZSI6ImFscGhhX25jdHUwMUBuY3R1LmVkdSJ9.PAElpe6wRZHw6j71kr9LZRTUUE-7sHwkca09ux7i3jT5nd98mfXZ5cGV0jEiiBruLNleUZ3KfWzFM2Bp7Zxisr5ctB0FkkO6PLZmoLxALQcjKfelmN_Z5hFc0BBBl5wktH3rwDK-iKmmfU3pF86Jp54zNVNyMFJIZm6wHy-VH9EoL1hQ74WZALCUwwqLK9yg-wAY09qbdVVgyTvsIJyvu30delzjDX6-aW8WHqiAkx0a4mCgh19AdrtLPtynb_oz1rb_gB2sbVdIKRn3CBApx76ZF0eDRvBShPqfnzhSDfVQS3uN2qq0g25WahMfVHYyGbkNzZbhCzofeUf0rsBltA',
    
    userwallet: {
      address: "0xa1C826520404B90eB61cBe2111e489182d41B939", // maybe use sk later, how to transform
      privateKey: "388359577d96c919193ca538baa076c624057c203261be59b6dc3337c3a125e4" // maybe use sk later
    },
    blockNumber: '',
    transactionHash: '',
    gasUsed: '',
    txReceipt: '',
    
    // test
    publicKey_commitee: ['04e665e0c1b15a2703c29f7b93566a2dd7b35664f828363d72a25796fe5ca7b520c342f5149f2aee7a7fc9b1b793b2a9f61d658370daf1be9ea67e461ebff9d6ce',
                         '0491b751ce40f7c2f94a2f79c7780f6975d61f1bd4683f79e0103a8b6ae11317bebab8973802fc667d4c46707ef314dfe79d16b2025dd0f0d6b6f2f67bce343975',
                         '0433e98029f048a8d0b7b55d786293fede03453d2affe73354ada4adae53ebd1ff6be6c376638eef8e030243c980cb2478b03dc6dfced974cf5a7ee8466f93a557',
                         '04126a2ad414792263f2bd710503929b21a81e53410be837c8bc15f73213144fcc1e4f123349a070570eb8ba66eed7a13801577296876ebcb7ad9920590d5ac4b7',
                         '0427ff7a403d1b8838361ebdbce094362597763f3d598ca2deb7e3a964f40a858f299138225d602a99928f0cda0e099901fe170b18cce31648a5ae01e1de281577'],
    sk: 'c94d682f7fe770baa5af4de2f0d7e934126a0f48b9f52bfb4672189dd4757fe5',
    secretKey_commitee: ['46ccd6a835169cd220286fbf690c0418d45f2d696c26940fa6628f3c74e56dd1',
                         'ad96e0f45d45e04b46f5880eae8e916a1c73685251240e8e889470228af40b5d',
                         '1fda6192f609baf6b68f5e926bf3c3ba679a69f1cd682f22109483dc40fd67d4',
                         '4127d22b91187311368918abf92a93483e5b500f90b08f7b67290d5e027d31d9',
                         '512193e674553048ed23e2011af9559deb7aa830ea8ffd8e1a1b31afd37d2678']
  };

  captureID = (event) => {
    event.stopPropagation()
    event.preventDefault()
    this.setState({id: event.target.value});
  }

  capturePk = (event) => {
    event.stopPropagation()
    event.preventDefault()
    this.setState({pk: event.target.value});
  }

  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)   
  };

  convertToBuffer = async(reader) => {
    var pii = Buffer.from(reader.result).toString('hex');
    this.setState({pii});
    console.log(Buffer.from(pii,'hex'));
    
    // 顯示上傳照片 test用
    var blob = new Blob([Buffer.from(pii,'hex')], {type: "image/png"})
    var image = new Image();
    image.src = await URL.createObjectURL(blob);
    document.body.appendChild(image);
  };

  onSubmit = async (event) => {
    event.preventDefault();

    /**
      *const id_user = 'mgmdUm12qq7jzS2vVfr2WssAx4PW8rrtFD';
      *const secretKey_user = 'c94d682f7fe770baa5af4de2f0d7e934126a0f48b9f52bfb4672189dd4757fe5';
      *const publicKey_user = '04cc902e04bd64bc2383aeb15934aa0b2ccd6c9420b0361edc4142303fddf5ea307be14aa91c851d1204d7ba7369d2a70f4fb94fcdfcc9726f08b46cfb3f310327';
      *const sk_user = Buffer.from(this.state.sk, 'hex');
      *const pk_user = Buffer.from(this.state.pk, 'hex');
      *const secretKey_commitee = ['46ccd6a835169cd220286fbf690c0418d45f2d696c26940fa6628f3c74e56dd1',
                                  'ad96e0f45d45e04b46f5880eae8e916a1c73685251240e8e889470228af40b5d',
                                '1fda6192f609baf6b68f5e926bf3c3ba679a69f1cd682f22109483dc40fd67d4',
                                  '4127d22b91187311368918abf92a93483e5b500f90b08f7b67290d5e027d31d9',
                                  '512193e674553048ed23e2011af9559deb7aa830ea8ffd8e1a1b31afd37d2678'];
      *const publicKey_commitee = ['04e665e0c1b15a2703c29f7b93566a2dd7b35664f828363d72a25796fe5ca7b520c342f5149f2aee7a7fc9b1b793b2a9f61d658370daf1be9ea67e461ebff9d6ce',
                          '0491b751ce40f7c2f94a2f79c7780f6975d61f1bd4683f79e0103a8b6ae11317bebab8973802fc667d4c46707ef314dfe79d16b2025dd0f0d6b6f2f67bce343975',
                          '0433e98029f048a8d0b7b55d786293fede03453d2affe73354ada4adae53ebd1ff6be6c376638eef8e030243c980cb2478b03dc6dfced974cf5a7ee8466f93a557',
                          '04126a2ad414792263f2bd710503929b21a81e53410be837c8bc15f73213144fcc1e4f123349a070570eb8ba66eed7a13801577296876ebcb7ad9920590d5ac4b7',
                          '0427ff7a403d1b8838361ebdbce094362597763f3d598ca2deb7e3a964f40a858f299138225d602a99928f0cda0e099901fe170b18cce31648a5ae01e1de281577'];
     */

    const sk_user = Buffer.from(this.state.sk, 'hex');
    const pk_user = Buffer.from(this.state.pk, 'hex');
  
    this.state.setState({Ken: '123456'}); // random generate Ken value, test Ken = 123456
    const Ken = this.state.Ken
    
    const aes = new AES();
    const ecies = new ECIES();
    const s4 = new S4();    

    var PII_en = await aes.encrypt(this.state.pii, Ken);
    console.log('PII_en:\n' + PII_en);

    var Ka_user = await ecies.encrypt(Ken, pk_user);
    var Ka_user_arr = [Ka_user.iv.toString('hex'), 
                       Ka_user.ephemPublicKey.toString('hex'), 
                       Ka_user.ciphertext.toString('hex'), 
                       Ka_user.mac.toString('hex')]
    console.log('Ka(user):\n' + Ka_user_arr);

    let Ks = await s4.shard(5, 4, Ken);
    console.log('Ks(i):');
    for (let i = 0; i < 5; i++){
      console.log(Ks[i].toString('hex'));
    }

    var Ka = [];
    for (let i = 0; i < 5; i++){
      let Ka_i = await ecies.encrypt(Ks[i].toString('hex'), Buffer.from(this.state.publicKey_commitee[i],'hex'));
      let Ka_i_arr = [Ka_i.iv.toString('hex'), 
                      Ka_i.ephemPublicKey.toString('hex'), 
                      Ka_i.ciphertext.toString('hex'), 
                      Ka_i.mac.toString('hex')]
      Ka.push(Ka_i_arr);
    }
    console.log('Ka(i):\n' + Ka);
     
    const web3 = await eeaClient(this.state.jwtToken,this.state.rpcendpoint);
    
    const balance = await web3.eth.getBalance(this.state.userwallet.address);
    console.log("Your balance is : "+web3.utils.fromWei(balance,"ether"));
    const targetContract = new web3.eth.Contract(abi, this.state.contractAddress)
    
    await ipfs.add(Buffer.from(PII_en), (err, ipfsHash) => {
      console.log('hash:\n' + ipfsHash[0].hash);
      this.state.setState({piihash: ipfsHash[0].hash});
      sendReg();
        
      async function sendReg(){
        // check amount of account before registration
        var allMember = await targetContract.methods.getAllMember().call()
        console.log(allMember);

        var data = targetContract.methods.addMember(this.state.id, this.state.pk, this.state.piihash, Ka_user_arr, Ka).encodeABI()
        const nonce = await web3.eth.getTransactionCount(this.state.userwallet.address)
        const tx_object = {
          nonce: `0x${new BigNumber(nonce).toString(16)}`,
          value: `0x0`,
          to: this.state.contractAddress,
          data: data,
          gasLimit: `0x${new BigNumber("20000000").toString(16)}`, // 設太小有時好像會炸開
          gasPrice: `0x0`
        }
        const rawtx = await signtx(tx_object, this.state.userwallet.privateKey)
        const txResult = await web3.eth.sendSignedTransaction(rawtx)
        if(txResult.transactionHash){
            console.log("----------\nYour TransactionHash :" + txResult.transactionHash,"\n----------")        
        }
          
        // check amount of account before registration
        allMember = await targetContract.methods.getAllMember().call()
        console.log(allMember);  
          
      }

      /** decode start 
        console.log("decode start")
        var Ka_user_a = {iv: Buffer.from(Ka_user_arr[0], 'hex'), 
                        ephemPublicKey: Buffer.from(Ka_user_arr[1], 'hex'), 
                        ciphertext: Buffer.from(Ka_user_arr[2], 'hex'),
                        mac: Buffer.from(Ka_user_arr[3], 'hex')};
        var Ka_a = [];
        for (let i = 0; i < 5; i++){
          let Ka_i_a = {iv: Buffer.from(Ka[i][0], 'hex'), 
                      ephemPublicKey: Buffer.from(Ka[i][1], 'hex'), 
                      ciphertext: Buffer.from(Ka[i][2], 'hex'),
                      mac: Buffer.from(Ka[i][3], 'hex')};
          Ka_a.push(Ka_i_a);
        }
        
        console.log("encode Ken:\n" + Ka_user_a);
        decode();

        async function decode() {
          // use commitee sk to decode
          var Ks_a = []
          for (let i = 0; i < 5; i++){
            var Ks_i = await ecies.decrypt(Ka_a[i], Buffer.from(this.state.secretKey_commitee[i],'hex'));
            Ks_i = Ks_i.toString();
            Ks_i = Buffer.from(Ks_i,'hex');
            console.log(Ks_i.toString('hex'));

            Ks_a.push(Ks_i);
          }
          console.log(Ks_a);
          var Ken_fir = await s4.merge(Ks_a);
          console.log("decode Ken by commitee: " + Ken_fir);
          var pii_fir = await aes.decrypt(PII_en, Ken_fir);
          console.log("decode pii by comiitee: \n" + Buffer.from(pii_fir,'hex'));

          // use user sk to decode
          var Ken_sec = await ecies.decrypt(Ka_user_a, sk_user);
          console.log("decode Ken by user: " + Ken_sec.toString());
          var pii_sec = await aes.decrypt(PII_en, Ken_sec.toString());
          console.log("decode pii by user: \n" + Buffer.from(pii_sec,'hex'));
          
          console.log("decode end")
        }
        
        decode end */ 
      
      

    })

  }; 

  onGetInfo = async () => {
    /*
      const accounts = await web3.eth.getAccounts();
      console.log('Sending from Metamask account: ' + accounts[0]);
      const ethAddress = await contractInfo.options.address;
      this.setState({ethAddress});
      var transactionReceipt = await contractInfo.methods.getRegistrationInfo().send({
        from: accounts[0] 
      }, (error, transactionHash) => {
        console.log(transactionHash);
        this.setState({transactionHash});
      }); 

      this.setState({id:transactionReceipt.events.ReturnRegistrationInfo.returnValues.regInfo[0]});
      this.setState({pk:transactionReceipt.events.ReturnRegistrationInfo.returnValues.regInfo[1]});
      this.setState({pii:transactionReceipt.events.ReturnRegistrationInfo.returnValues.regInfo[2]});
      this.setState({Ka_user:transactionReceipt.events.ReturnRegistrationInfo.returnValues.regInfo[3]});
      this.setState({Ka:transactionReceipt.events.ReturnRegistrationInfo.returnValues.regInfo[4]});
      console.log("ID: " + this.state.id);
      console.log("pk_user: " + this.state.pk);
      console.log("piiHash: " + this.state.pii);
      console.log("Ka_user: " + this.state.Ka_user);
      for(let i = 0; i < 5; i++){
        console.log("Ka" + i + ': ' + this.state.Ka[i]);
      }
    */
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>DAO-IAM Registration</h1>
        </header>  
        <hr/>
        <h3> Input your ID, Pk, PII </h3>
        <form onSubmit={this.onSubmit}>
            <p>
              <span>ID: </span><input type = "text" onChange = {this.captureID}/>
            </p>
            <p>
              <span>Public Key: </span><input type = "text" onChange = {this.capturePk}/>
            </p>
            <p>
              <span>PII: </span>
                <input type = "file" onChange = {this.captureFile}/>
            </p>
            <p>
              <button type="submit">Send it</button>
            </p>
        </form>
        <hr/>
        <button onClick = {this.onGetInfo}> Get Registration Info. </button>
        <div>
        </div>
        <table>
            <thead>
              <tr>
                <th>Tx Receipt Category</th>
                <th>Values</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IPFS Hash # stored on Eth Contract</td>
                <td>{this.state.ipfsHash}</td>
              </tr>
              <tr>
                <td>Ethereum Contract Address</td>
                <td>{this.state.ethAddress}</td>
              </tr>
              <tr>
                <td>Tx Hash # </td>
                <td>{this.state.transactionHash}</td>
              </tr>
              <tr>
                <td>Block Number # </td>
                <td>{this.state.blockNumber}</td>
              </tr>
              <tr>
                <td>Gas Used</td>
                <td>{this.state.gasUsed}</td>
              </tr>
            </tbody>
        </table>
        
      </div>
    );
  } //render
} //App
export default App;