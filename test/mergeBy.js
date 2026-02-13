'use strict';

QUnit.module("Тестируем функцию mergeBy", function() {
    QUnit.test("Работает правильно с одинаковыми значениями по ключу", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] }
        ];
        const array2 = [
            { id: 1, age: 30, tags: ["travel"] },
            { id: 3, name: "Charlie" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 3, name: "Charlie" }
        ]);
    });

    QUnit.test("Работает правильно с отсутствующими ключами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ];
        const array2 = [
            { age: 30 },
            { id: 2, age: 25 }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob", age: 25 }
        ]);
    });

    QUnit.test("Работает правильно с объединением массивов", function(assert) {
        const array1 = [
            { id: 1, items: [{ productId: 1 }, { productId: 2 }] }
        ];
        const array2 = [
            { id: 1, items: [{ productId: 2 }, { productId: 3 }] }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            {id: 1, items: [{ productId: 1 }, { productId: 2 }, { productId: 3 }]}
        ]);
    });

    QUnit.test("Работает правильно с пустыми массивами", function(assert) {
        const array1 = [];
        const array2 = [];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, []);
    });

    QUnit.test("Работает правильно с null и undefined", function(assert) {
        const array1 = [
            { id: 1, value: null }, 
            { id: 2, value: undefined }
        ];
        const array2 = [
            { id: 1, extra: "data" }, 
            { id: 2, extra: "info" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            {id: 1, value: null, extra: "data"},
            {id: 2, value: undefined, extra: "info"}
        ]);
    });

    QUnit.test("Работает правильно с вложенными объектами", function(assert) {
        const array1 = [
            {   
            id: 1, 
            profile: { 
                name: "Alice", 
                settings: { theme: "dark", lang: "ru" },
                contacts: { email: "alice@example.com" }
            } 
            }
        ];
        const array2 = [
            { 
                id: 1, 
                profile: { 
                    settings: { notifications: true, lang: "en" },
                    contacts: { phone: "88005553535" },
                    preferences: { color: "blue" }
                } 
            }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { 
                id: 1, 
                profile: { 
                    name: "Alice", 
                    settings: { theme: "dark", lang: "ru", notifications: true },
                    contacts: { email: "alice@example.com", phone: "88005553535" },
                    preferences: { color: "blue" }
                } 
            }
        ]);
    });
});
