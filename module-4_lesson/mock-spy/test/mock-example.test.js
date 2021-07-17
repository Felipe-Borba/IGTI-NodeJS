const mockExample = require("../src/mock-example");

test("should call mock people", () => {
  //Given
  let peoples = new Array(3);

  peoples[0] = {
    name: "Felipe",
    age: 19,
  };

  peoples[1] = {
    name: "Amanda",
    age: 14,
  };

  peoples[2] = {
    name: "Mat",
    age: 54,
  };

  const mockCallback = jest.fn((p) => p.age);

  //when
  mockExample.realiseForAdults(peoples, mockCallback);

  //then
  expect(mockCallback.mock.calls.length).toBe(2);
  expect(mockCallback.mock.calls[0][0]).toBe(peoples[0]);
  expect(mockCallback.mock.results[0].value).toBe(peoples[0].age);
});

test("should mock timer", (done) => {
  jest.useFakeTimers();

  const mockCallback = jest.fn(() => done());

  mockExample.keepTime(mockCallback);

  jest.advanceTimersByTime(1000);
  expect(mockCallback).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(3000);
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

afterEach(() => {
  jest.useRealTimers();
});
