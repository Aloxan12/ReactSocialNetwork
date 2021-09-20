import {UsersAPI} from "../api/users-api";
import {APIResponseType, GetItemsType, ResultCodesEnum} from "../api/api";
import {actions, follow, getUsers, unfollow} from "./users-reducer";

jest.mock("../api/users-api");
const userAPIMock = UsersAPI as jest.Mocked<typeof UsersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

let responseGetItem: GetItemsType;

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unfollow.mockClear();
    userAPIMock.getUsers.mockClear();

    responseGetItem = {
        items: [
            {
                id: 1,
                name: "Vlad",
                followed: false,
                photos: {small: null, large: null},
                status: "Status 1",
            },
            {
                id: 2,
                name: "Vlad 2",
                followed: false,
                photos: {small: null, large: null},
                status: "Status 2",
            },
            {
                id: 3,
                name: "Vlad 3",
                followed: true,
                photos: {small: null, large: null},
                status: "Status 3",
            },
            {
                id: 4,
                name: "Vlad 3",
                followed: true,
                photos: {small: null, large: null},
                status: "Status 4",
            },
        ],
        totalCount: 4,
        error: null,
    };
});

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {},
};

test("success follow thunk", async () => {
    const thunk = follow(1);

    userAPIMock.follow.mockReturnValue(Promise.resolve(result));

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
        1,
        actions.toggleFollowingIsProgress(true, 1)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(
        3,
        actions.toggleFollowingIsProgress(false, 1)
    );
});

test("success unfollow thunk", async () => {
    const thunk = unfollow(1);

    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
        1,
        actions.toggleFollowingIsProgress(true, 1)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(
        3,
        actions.toggleFollowingIsProgress(false, 1)
    );
});

test("requestUsers success", async () => {
    const filteredMock = {
        term: '',
        friend: null
    }
    const thunk = getUsers(1, 3, filteredMock);

    userAPIMock.getUsers.mockReturnValue(Promise.resolve(responseGetItem));

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(6);

    expect(dispatchMock).toHaveBeenNthCalledWith(
        1,
        actions.toggleIsFetching(true)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setCurrentPage(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(
        3,
        actions.setFilter({term: '', friend: null})
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
        4,
        actions.toggleIsFetching(false)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
        5,
        actions.setUsers(responseGetItem.items)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
        6,
        actions.setTotalUsersCount(responseGetItem.totalCount)
    );
});
