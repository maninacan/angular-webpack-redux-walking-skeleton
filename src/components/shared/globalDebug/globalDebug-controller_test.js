//import Ctrl from './globalDebug-controller';
//import P from 'bluebird';
//
//let assert = chai.assert,
//    growAPromise = function (thing) {
//        let oThing = Object(thing);
//        oThing.$promise = new P(function (res, rej) {
//            if (false) {
//                rej(new Error('There was an error'));
//            }
//            res(thing);
//        });
//        return oThing;
//    },
//
//    compliments = [
//        'That is some Alan Turing level code you just wrote!',
//        'You look great today!',
//        'Way to be awesome!'
//    ],
//    resourceMock = function (url) {
//        return {
//            get(index) { return growAPromise(compliments[index]); },
//            save(compliment) {
//                compliments = compliments.concat(compliment);
//                return compliments.length - 1;
//            },
//            query() { return growAPromise(compliments.slice()); },
//            remove(index) {
//                compliments = compliments.splice(index, 1);
//                return true;
//            },
//            delete() {
//                this.remove(...arguments);
//            }
//        };
//    };
//
//describe('globalDebug Controller', () => {
//    beforeEach(angular.mock.module('roApp'));
//
//    it('should be defined', function () {
//        assert.isDefined(Ctrl);
//        assert.isDefined(new Ctrl(resourceMock()));
//    });
//
//    it('should have a compliments array', function () {
//        let ctrl = new Ctrl(resourceMock());
//        assert.isArray(ctrl.compliments);
//    });
//});
